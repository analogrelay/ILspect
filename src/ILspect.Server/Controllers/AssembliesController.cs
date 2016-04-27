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

        [HttpPut]
        [Route("")]
        public IEnumerable<ApiResponse<AssemblyModel>> Put([FromBody] string[] paths)
        {
            return paths.Select(path =>
            {
                try
                {
                    var entry = _assemblies.OpenAssembly(path);
                    return ApiResponse.Create(path, LoadAssembly(entry));
                }
                catch (Exception ex)
                {
                    return ApiResponse.Create<AssemblyModel>(path, ex);
                }
            });
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(string id)
        {
            var entry = _assemblies.GetAssemblyOrDefault(id);
            if (entry == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(ApiResponse.Create<AssemblyModel>(id, LoadAssembly(entry)));
            }
        }

        private static AssemblyModel LoadAssembly(AssemblyEntry entry)
        {
            return new AssemblyModel()
            {
                Id = entry.Id.ToString("N"),
                Name = entry.Name,
                Path = entry.Path,
                HasMetadata = entry.Module != null,
                Namespaces = GetNamespaces(entry)
            };
        }

        private static IEnumerable<NamespaceModel> GetNamespaces(AssemblyEntry entry)
        {
            return entry.Namespaces.Values.OrderBy(n => n.Name).Select(LoadNamespace);
        }

        private static NamespaceModel LoadNamespace(NamespaceEntry entry)
        {
            return new NamespaceModel()
            {
                Name = entry.Name,
                Types = entry.Types.Values.OrderBy(t => t.Name).Select(LoadType)
            };
        }

        private static TypeModel LoadType(TypeEntry entry)
        {
            return new TypeModel()
            {
                Name = entry.Name,
                Kind = entry.Kind,
                Members = entry.Members.Values.OrderBy(t => t.Name).Select(LoadMember)
            };
        }

        private static MemberModel LoadMember(MemberEntry entry)
        {
            return new MemberModel()
            {
                Name = entry.Name,
                Kind = entry.Kind
            };
        }
    }
}