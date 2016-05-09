using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;

namespace ILspect
{
    public class Program
    {
        private static readonly string ElectronExeName = GetElectronExeName();

        private static string GetElectronExeName()
        {
            if (Environment.OSVersion.Platform == PlatformID.Win32NT)
            {
                return "electron.exe";
            }
            else
            {
                return "Electron.app/Contents/MacOS/Electron";
            }
        }

        public static void Main(string[] args)
        {
            // Load up the electron args
            var app = new CommandLineApplication();
            var serverOnlyFlag = app.Option("--server", "Just start the server", CommandOptionType.NoValue);
            var electronPathOption = app.Option("--electron-path <PATH_TO_ELECTRON>", "The path to the electron executable", CommandOptionType.SingleValue);
            var electronRootOption = app.Option("--electron-root <ELECTRON_ROOT>", "The root path of the electron application", CommandOptionType.SingleValue);
            var portOption = app.Option("--port <PORT>", "A port on which the server will listen", CommandOptionType.SingleValue);

            app.OnExecute(() =>
            {
                Process electron = null;
                int port = 5000;
                if (portOption.HasValue())
                {
                    port = int.Parse(portOption.Value());
                }

                var host = new WebHostBuilder()
                    .UseKestrel()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseUrls($"http://localhost:{port}")
                    .UseStartup<Startup>()
                    .Build();

                host.Start();

                var applicationLifetime = host.Services.GetService<IApplicationLifetime>();
                var serverAddresses = host.ServerFeatures.Get<IServerAddressesFeature>()?.Addresses;

                Uri serverAddress;
                if (serverAddresses == null || serverAddresses.Count == 0 || !Uri.TryCreate(serverAddresses.First(), UriKind.Absolute, out serverAddress))
                {
                    Console.Error.WriteLine("Unable to detect server port number!");
                    return 1;
                }

                // Launch electron if requested
                if (!serverOnlyFlag.HasValue())
                {
                    electron = LaunchElectron(electronPathOption.Value(), electronRootOption.Value(), serverAddress.Port);
                    electron.EnableRaisingEvents = true;
                    electron.Exited += (_, __) =>
                    {
                        applicationLifetime.StopApplication();
                    };
                }

                applicationLifetime.ApplicationStopped.WaitHandle.WaitOne();

                if (electron != null && !electron.HasExited)
                {
                    electron.Kill();
                }

                return 0;
            });

            app.Execute(args);
        }

        private static Process LaunchElectron(string electronPath, string electronRoot, int port)
        {
            if (string.IsNullOrEmpty(electronPath))
            {
                // TODO: Change this to the location of electron in the dist package
                electronPath = Path.Combine(Directory.GetCurrentDirectory(), "node_modules", "electron-prebuilt", "dist", ElectronExeName);
            }
            else
            {
                electronPath = Path.Combine(Directory.GetCurrentDirectory(), electronPath);
            }

            if (!File.Exists(electronPath))
            {
                throw new FileNotFoundException($"Could not find electron in desired path: {electronPath}");
            }

            if (string.IsNullOrEmpty(electronRoot))
            {
                electronRoot = "wwwroot";
            }

            electronRoot = Path.Combine(Directory.GetCurrentDirectory(), electronRoot);

            var electronEntryPoint = Path.Combine(electronRoot, "electron", "app.js");

            var electronArgs = $"{electronEntryPoint} {port}";

            var psi = new ProcessStartInfo()
            {
                FileName = electronPath,
                Arguments = electronArgs
            };
            Console.WriteLine($"Starting Electron: {electronPath} {electronArgs}");
            return Process.Start(psi);
        }
    }
}
