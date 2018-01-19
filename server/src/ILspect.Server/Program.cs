using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace ILspect.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseUrls("http://127.0.0.1:0")
                .UseStartup<Startup>()
                .Build();
    }
}
