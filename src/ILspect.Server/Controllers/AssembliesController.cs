using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ILspect.Server.ResponseModels;
using ILspect.Server.Data;
using System;
using System.Reflection.Metadata;

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
                    
                    var namespaces = WalkNamespaces(model.MetadataReader);
                    
                    return ApiResponse.Create(path, new AssemblyModel()
                    {
                        Id = model.Id.ToString("N"),
                        Name = model.Name,
                        Path = model.Path,
                        HasMetadata = model.HasMetadata,
                        Namespaces = namespaces
                    });
                }
                catch (Exception ex)
                {
                    return ApiResponse.Create<AssemblyModel>(path, ex);
                }
            });
        }
        
        private IEnumerable<NamespaceModel> WalkNamespaces(MetadataReader reader) => WalkNamespaces("", reader, reader.GetNamespaceDefinitionRoot());
        
        private IEnumerable<NamespaceModel> WalkNamespaces(string prefix, MetadataReader reader, NamespaceDefinition root)
        {
            var name = reader.GetString(root.Name);
            if (root.TypeDefinitions.Any())
            {
                yield return CreateNamespaceModel(prefix + name, reader, root);
            }

            string newPrefix = string.IsNullOrEmpty(name) ? "" : $"{prefix}{name}.";

            var subnamespaces = root.NamespaceDefinitions
                .SelectMany(h => WalkNamespaces(newPrefix, reader, reader.GetNamespaceDefinition(h)));
            foreach (var subnamespace in subnamespaces)
            {
                yield return subnamespace;
            }
        }
        
        private NamespaceModel CreateNamespaceModel(string name, MetadataReader reader, NamespaceDefinition ns) {
            var types = ns.TypeDefinitions.Select(t => {
                var typ = reader.GetTypeDefinition(t);
                return new TypeModel {
                    Name = reader.GetString(typ.Name)
                };
            });
            return new NamespaceModel {
                Name = name,
                Types = types
            };
        }
    }
}