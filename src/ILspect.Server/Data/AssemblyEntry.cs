using System;
using Mono.Cecil;

namespace ILspect.Server.Data
{
    public class AssemblyEntry
    {
        public Guid Id { get; }
        public string Name { get; set; }
        public string Path { get; set; }
        public bool HasMetadata { get; set; }
        public ModuleDefinition Module { get; set; }
        
        public AssemblyEntry(Guid id)
        {
            Id = id;
        }
    }
}