using System;
using System.Diagnostics;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.CommandLineUtils;

namespace ILspect
{
    public class Program
    {
        private const string ElectronExeName = "electron.exe";

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
                int port = 5000; // When https://github.com/aspnet/KestrelHttpServer/issues/758 lands we can set this to 0!
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

                // Launch electron if requested
                if(!serverOnlyFlag.HasValue())
                {
                    electron = LaunchElectron(electronPathOption.Value(), electronRootOption.Value(), port);
                    electron.EnableRaisingEvents = true;
                    electron.Exited += (_, __) =>
                    {
                        host.Dispose();
                    };
                }

                host.Run();

                if(electron != null && !electron.HasExited)
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
                electronPath = Path.Combine(Directory.GetCurrentDirectory(), "node_modules", "electron-prebuilt", "dist", ElectronExeName);
            }

            if(!File.Exists(electronPath))
            {
                throw new FileNotFoundException($"Could not find electron in desired path: {electronPath}");
            }

            if(string.IsNullOrEmpty(electronRoot))
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