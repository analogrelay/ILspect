using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ILspect.Server
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging();
            services.AddMvcCore()
                .AddJsonFormatters();
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            app.Use((next) => async (context) =>
            {
                if (context.Request.Path.StartsWithSegments(new PathString("/_status")))
                {
                    context.Response.StatusCode = StatusCodes.Status200OK;
                }
                else
                {
                    await next(context);
                }
            });
            app.UseMvcWithDefaultRoute();
        }
    }
}