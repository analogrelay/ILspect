using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Mono.Cecil;

namespace ILspect.Data
{
    public class AssemblyEntity
    {
        public string Id { get; }
        public string Name { get; }
        public string Path { get; }
        public ModuleDefinition Module { get; }
        public IDictionary<string, NamespaceEntity> Namespaces { get; }

        public AssemblyEntity(string id, string name, string path, ModuleDefinition module)
        {
            Id = id;
            Name = name;
            Path = path;
            Module = module;
            Namespaces = new Dictionary<string, NamespaceEntity>();
        }
    }
}