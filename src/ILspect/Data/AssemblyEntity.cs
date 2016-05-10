using System.Collections.Generic;
using Mono.Cecil;

namespace ILspect.Data
{
    public class AssemblyEntity
    {
        public string Id { get; }
        public string Name { get; }
        public string Path { get; }
        public AssemblyDefinition Definition { get; }
        public IDictionary<string, NamespaceEntity> Namespaces { get; }

        public AssemblyEntity(string id, string name, string path, AssemblyDefinition asm)
        {
            Id = id;
            Name = name;
            Path = path;
            Definition = asm;
            Namespaces = new Dictionary<string, NamespaceEntity>();
        }
    }
}