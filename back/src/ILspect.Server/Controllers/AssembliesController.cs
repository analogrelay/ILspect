using System.IO;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ILspect.Server.State;

namespace ILspect.Server.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AssembliesController : ControllerBase
    {
        [Route("")]
        public IEnumerable<AssemblyModel> Put([FromBody] string[] paths)
        {
            return paths.Select(path => new AssemblyModel
            {
                Name = Path.GetFileNameWithoutExtension(path),
                Path = path    
            });
        }
    }
}