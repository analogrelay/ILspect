using System.Collections.Generic;
using Mono.Cecil;

namespace ILspect.Data
{
    public class TypeEntry : MemberEntry
    {
        public NamespaceEntry Namespace { get; }
        
        public new TypeDefinition Definition => (TypeDefinition)base.Definition;
        
        public IDictionary<string, MemberEntry> Members { get; }
        
        public TypeEntry(TypeEntry parent, NamespaceEntry ns, string name, TypeDefinition definition)
            : base(parent, name, MemberKind.Type, definition)
        {
            Namespace = ns;
            Members = new Dictionary<string, MemberEntry>();
        }
    }
}