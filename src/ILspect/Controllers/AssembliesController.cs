using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ILspect.ResponseModels;
using ILspect.Data;
using System;

namespace ILspect.Controllers
{
    [Produces("application/json")]
    public class AssembliesController : ControllerBase
    {
        private readonly AssemblyTable _assemblies;

        public AssembliesController(AssemblyTable assemblies)
        {
            _assemblies = assemblies;
        }

        [HttpPut]
        [Route("api/assemblies")]
        public IEnumerable<ApiResponse<AssemblyModel>> Put([FromBody] string[] paths)
        {
            return paths.Select(path =>
            {
                try
                {
                    var entry = _assemblies.AddAssembly(path);
                    return ApiResponse.Create(path, LoadAssembly(entry));
                }
                catch (Exception ex)
                {
                    return ApiResponse.Create<AssemblyModel>(path, ex);
                }
            });
        }

        [HttpGet]
        [Route("api/assemblies")]
        public IActionResult GetAll()
        {
            return Ok(ApiResponse.Create("", _assemblies.GetAllAssemblies().Select(LoadAssembly)));
        }

        [HttpGet]
        [Route("api/assemblies/{id}")]
        public IActionResult Get(string id)
        {
            var entry = _assemblies.GetAssembly(Guid.ParseExact(id, "N"));
            if (entry == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(ApiResponse.Create(id, LoadAssembly(entry)));
            }
        }

        private AssemblyModel LoadAssembly(AssemblyEntity entry)
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

        private IEnumerable<NamespaceModel> GetNamespaces(AssemblyEntity entry)
        {
            return entry.Namespaces.Values.OrderBy(n => n.Name).Select(LoadNamespace);
        }

        private NamespaceModel LoadNamespace(NamespaceEntity entry)
        {
            return new NamespaceModel()
            {
                Name = entry.Name,
                Types = entry.Types.Values.OrderBy(t => t.Name).Select(LoadType)
            };
        }

        private TypeModel LoadType(Data.TypeEntity entry)
        {
            return new TypeModel()
            {
                Name = entry.Name,
                Kind = entry.Kind,
                Members = entry.Members.Values.OrderBy(t => t.Name).Select(LoadMember)
            };
        }

        private MemberModel LoadMember(MemberEntity entry)
        {
            return new MemberModel()
            {
                Name = entry.Name,
                Kind = entry.Kind,
                Details = Url.Action("Get", "Details", new
                {
                    assemblyId = entry.Type.Namespace.Assembly.Id.ToString("N"),
                    namespaceName = string.IsNullOrEmpty(entry.Type.Namespace.Name) ? Constants.DefaultNamespace : entry.Type.Namespace.Name,
                    typeName = entry.Type.Name,
                    memberName = entry.Name
                })
            };
        }
    }
}