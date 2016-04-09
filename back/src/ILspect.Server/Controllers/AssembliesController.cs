using System.IO;
using Microsoft.AspNetCore.Mvc;
using ILspect.Server.ViewModels;

namespace ILspect.Server.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AssembliesController : ControllerBase
    {
        [Route("")]
        public AssemblyViewModel Put([FromBody] string path)
        {
            return new AssemblyViewModel
            {
                Name = Path.GetFileNameWithoutExtension(path),
                Loaded = false    
            };
        }
    }
}