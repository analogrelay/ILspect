
using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;

namespace ILspect.Model
{
    public class TypeDisassembly
    {
        public string FullName => Definition.FullName;
        public string Namespace => Definition.Namespace;
        public TypeDefinition Definition { get; }
        public IList<MemberDisassembly> Members { get; }

        public TypeDisassembly(TypeDefinition typeDefinition)
        {
            Definition = typeDefinition;

            var members = new List<MemberDisassembly>(
                typeDefinition.Fields.Count +
                typeDefinition.Methods.Count +
                typeDefinition.Properties.Count +
                typeDefinition.Events.Count +
                typeDefinition.NestedTypes.Count
            );

            members.AddRange(typeDefinition.Fields.Select(m => new MemberDisassembly(m)));
            members.AddRange(typeDefinition.Methods.Select(m => new MemberDisassembly(m)));
            members.AddRange(typeDefinition.Properties.Select(m => new MemberDisassembly(m)));
            members.AddRange(typeDefinition.Events.Select(m => new MemberDisassembly(m)));
            members.AddRange(typeDefinition.NestedTypes.Select(m => new MemberDisassembly(m)));

            Members = members;
        }
    }
}