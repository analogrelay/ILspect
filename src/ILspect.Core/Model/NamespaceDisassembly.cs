using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;

namespace ILspect.Model
{
    public class NamespaceDisassembly
    {
        public string Name { get; }
        public IList<TypeDisassembly> Types { get; }

        public NamespaceDisassembly(string name, IEnumerable<TypeDisassembly> types)
        {
            Name = string.IsNullOrEmpty(name) ? null : name;
            Types = types.ToList();
        }
    }
}