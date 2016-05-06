using System.Collections.Generic;

namespace ILspect.Data
{
    public class NamespaceEntity
    {
        public AssemblyEntity Assembly { get; }

        public string Name { get; }
        
        public IDictionary<string, TypeEntity> Types { get; }
        
        public NamespaceEntity(AssemblyEntity assembly, string name)
        {
            Assembly = assembly;
            Name = name;
            Types = new Dictionary<string, TypeEntity>();
        }
    }
}