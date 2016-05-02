using System.Collections.Generic;

namespace ILspect.Data
{
    public class NamespaceEntry
    {
        public AssemblyEntry Assembly { get; }
        
        public string Name { get; }
        
        public IDictionary<string, TypeEntry> Types { get; }
        
        public NamespaceEntry(AssemblyEntry assembly, string name)
        {
            Assembly = assembly;
            Name = name;
            Types = new Dictionary<string, TypeEntry>();
        }
    }
}