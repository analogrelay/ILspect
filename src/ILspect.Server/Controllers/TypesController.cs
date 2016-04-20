using Microsoft.AspNetCore.Mvc;
using ILspect.Server.Data;
using System;
using ILspect.Server.ResponseModels;
using System.Collections.Generic;
using System.Linq;

namespace ILspect.Server.Controllers
{
    [Produces("application/json")]
    public class TypesController : ControllerBase
    {
        private readonly AssemblyTable _assemblies;

        public TypesController(AssemblyTable assemblies)
        {
            _assemblies = assemblies;
        }

        [Route("api/assemblies/{assemblyId}/{ns}")]
        public ApiResponse<IEnumerable<TypeModel>> Get(string assemblyId, string ns)
        {
            var respId = $"{assemblyId}/{ns}";
            var assembly = _assemblies.GetAssembly(Guid.ParseExact(assemblyId, "N"));
            if (assembly == null)
            {
                return ApiResponse.Create<IEnumerable<TypeModel>>(
                    respId,
                    new Error(type: "NotFound", message: $"The assembly with ID {assemblyId} is not loaded", details: null)
                    );
            }

            // Get the namespace definition
            var namespaceDef = assembly.GetNamespace(ns);
            if (namespaceDef == null)
            {
                return ApiResponse.Create<IEnumerable<TypeModel>>(
                    respId,
                    new Error(type: "NotFound", message: $"The namespace {ns} does not exist in {assembly.Name}", details: null));
            }
            
            // List types in the namespace
            return ApiResponse.Create(respId,
                namespaceDef.Value.TypeDefinitions.Select(t => new TypeModel() {
                    Name = assembly.MetadataReader.GetString(assembly.MetadataReader.GetTypeDefinition(t).Name)
                }));
        }
    }
}