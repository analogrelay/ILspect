using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace ILspect.Server.Hubs
{
    public class Disassembler : Hub
    {
        public Task AddAssemblies(string[] paths)
        {
            // TODO: Actually load assemblies
            var tasks = paths.Select(path =>
            {
                return Clients.Client(Context.ConnectionId).InvokeAsync(
                    "AddedAssembly",
                    new
                    {
                        name = Path.GetFileName(path),
                        path = path,
                    });
            });

            return Task.WhenAll(tasks);
        }
    }
}