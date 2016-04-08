using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Xildasm.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var portStr = Environment.GetEnvironmentVariable("PORT");
            var port = 5000;
            if (!string.IsNullOrEmpty(portStr)) {
                port = Int32.Parse(Environment.GetEnvironmentVariable("PORT"));
                Environment.SetEnvironmentVariable("PORT", "");
            }
            
            var host = new WebHostBuilder()
                        .UseKestrel()
                        .UseContentRoot(Directory.GetCurrentDirectory())
                        .UseDefaultHostingConfiguration(args)
                        .UseUrls($"http://localhost:{port}")
                        .UseStartup<Startup>()
                        .Build();

            host.Run();
        }
    }
}