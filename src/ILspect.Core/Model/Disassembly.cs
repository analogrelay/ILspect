using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;

namespace ILspect.Model
{
    public class Disassembly
    {
        public AssemblyDefinition Assembly { get; }

        public IList<NamespaceDisassembly> Namespaces { get; }
        public IList<TypeDisassembly> Types { get; }

        public Disassembly(AssemblyDefinition assembly)
        {
            Assembly = assembly;

            // Load indexes
            Types = assembly
                .Modules
                .SelectMany(m => m.Types)
                .Select(t => new TypeDisassembly(t))
                .OrderBy(t => t.FullName)
                .ToList();

            Namespaces = Types
                .GroupBy(t => t.Namespace)
                .Select(g => new NamespaceDisassembly(g.Key, g))
                .OrderBy(n => n.Name)
                .ToList();
        }
    }
}