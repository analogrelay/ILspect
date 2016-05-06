using System.Collections.Generic;
using Mono.Cecil;

namespace ILspect.Data
{
    public class TypeEntity : MemberEntity
    {
        public NamespaceEntity Namespace { get; }
        
        public new TypeDefinition Definition => (TypeDefinition)base.Definition;
        
        public IDictionary<string, MemberEntity> Members { get; }
        
        public TypeEntity(TypeEntity parent, NamespaceEntity ns, string name, TypeDefinition definition)
            : base(parent, name, MemberKind.Type, definition)
        {
            Namespace = ns;
            Members = new Dictionary<string, MemberEntity>();
        }
    }
}