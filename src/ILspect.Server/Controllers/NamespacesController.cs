using Microsoft.AspNetCore.Mvc;
using ILspect.Server.Data;
using System;
using ILspect.Server.ResponseModels;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Linq;

namespace ILspect.Server.Controllers
{
    [Produces("application/json")]
    public class NamespacesController : ControllerBase
    {
        private readonly AssemblyTable _assemblies;

        public NamespacesController(AssemblyTable assemblies)
        {
            _assemblies = assemblies;
        }

        [Route("api/assemblies/{assemblyId}")]
        public ApiResponse<IEnumerable<NamespaceModel>> Get(string assemblyId)
        {
            var assembly = _assemblies.GetAssembly(Guid.ParseExact(assemblyId, "N"));
            if (assembly == null)
            {
                return ApiResponse.Create<IEnumerable<NamespaceModel>>(
                    assemblyId,
                    new Error(type: "NotFound", message: $"The assembly with ID {assemblyId} is not loaded", details: null)
                    );
            }

            // Recursively walk namespaces to build a list
            return ApiResponse.Create(assemblyId, WalkNamespaces(string.Empty, assembly.MetadataReader, assembly.MetadataReader.GetNamespaceDefinitionRoot()));
        }

        private IEnumerable<NamespaceModel> WalkNamespaces(string prefix, MetadataReader reader, NamespaceDefinition root)
        {
            var name = reader.GetString(root.Name);
            if (root.TypeDefinitions.Any())
            {
                yield return new NamespaceModel()
                {
                    Name = prefix + name
                };
            }

            string newPrefix = string.IsNullOrEmpty(name) ? "" : $"{prefix}{name}.";

            var subnamespaces = root.NamespaceDefinitions
                .SelectMany(h => WalkNamespaces(newPrefix, reader, reader.GetNamespaceDefinition(h)));
            foreach (var subnamespace in subnamespaces)
            {
                yield return subnamespace;
            }
        }
    }
}