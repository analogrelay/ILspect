using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ILspect.Server.ResponseModels;
using ILspect.Server.Data;
using System;
using Mono.Cecil;

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
                    
                    var namespaces = EnumerateNamespaces(model.Module);
                    
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
        
        private IEnumerable<NamespaceModel> EnumerateNamespaces(ModuleDefinition module)
        {
            var namespaces = module.Types.GroupBy(t => t.Namespace).OrderBy(g => g.Key);
            
            foreach(var ns in namespaces)
            {
                yield return CreateNamespaceModel(ns.Key, ns);
            }
        }
        
        private NamespaceModel CreateNamespaceModel(string name, IEnumerable<TypeDefinition> types) {
            return new NamespaceModel
            {
                Name = name,
                Types = types.Select(t => CreateTypeModel(t))
            };
        }
        
        private TypeModel CreateTypeModel(TypeDefinition type)
        {
            var members = new List<MemberModel>();
            members.AddRange(type.NestedTypes.Select(t => CreateTypeModel(t)));
            members.AddRange(type.Fields.Select(f => CreateFieldModel(f)));
            members.AddRange(type.Events.Select(e => CreateEventModel(e)));
            members.AddRange(type.Methods.Select(m => CreateMethodModel(m)));
            members.AddRange(type.Properties.Select(p => CreatePropertyModel(p)));
            return new TypeModel() {
                Name = type.Name,
                Kind = MemberKind.Type,
                Members = members
            };
        }

        private MemberModel CreatePropertyModel(PropertyDefinition prop)
        {
            return new MemberModel {
                Name = prop.Name,
                Kind = MemberKind.Property
            };
        }

        private MemberModel CreateMethodModel(MethodDefinition method)
        {
            return new MemberModel {
                Name = method.Name,
                Kind = MemberKind.Method
            };
        }

        private MemberModel CreateEventModel(EventDefinition evt)
        {
            return new MemberModel {
                Name = evt.Name,
                Kind = MemberKind.Event
            };
        }

        private MemberModel CreateFieldModel(FieldDefinition field)
        {
            return new MemberModel() {
                Name = field.Name,
                Kind = MemberKind.Field
            };
        }
    }
}