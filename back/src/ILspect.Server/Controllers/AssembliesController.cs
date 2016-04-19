using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ILspect.Server.ResponseModels;
using ILspect.Server.Data;
using System;

namespace ILspect.Server.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AssembliesController : ControllerBase
    {
        private readonly AssemblyTable _assemblies;

        public AssembliesController(AssemblyTable assemblies)
        {
            _assemblies = assemblies;
        }

        [Route("")]
        public IEnumerable<ApiResponse<AssemblyModel>> Put([FromBody] string[] paths)
        {
            return paths.Select(path =>
            {
                try
                {
                    var model = _assemblies.OpenAssembly(path);
                    return ApiResponse.Create(path, new AssemblyModel()
                    {
                        Id = model.Id.ToString("N"),
                        Name = model.Name,
                        Path = model.Path,
                        HasMetadata = model.HasMetadata
                    });
                }
                catch (Exception ex)
                {
                    return ApiResponse.Create<AssemblyModel>(path, ex);
                }
            });
        }
    }
}