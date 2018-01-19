using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ILspect.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            new WebHostBuilder()
                .UseKestrel()
                .UseUrls("http://127.0.0.1:0")
                .ConfigureLogging(builder =>
                {
                    builder.Services.AddSingleton<ILoggerProvider, JsonConsoleLoggerProvider>();
                })
                .UseStartup<Startup>()
                .Build();
    }
}
