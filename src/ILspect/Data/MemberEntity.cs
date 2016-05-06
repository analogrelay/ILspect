using Mono.Cecil;

namespace ILspect.Data
{
    public class MemberEntity
    {
        public TypeEntity Type { get; }
        public string Name { get; }
        public MemberKind Kind { get; }
        public IMemberDefinition Definition { get; }

        public MemberEntity(TypeEntity type, string name, MemberKind kind, IMemberDefinition definition)
        {
            Type = type;
            Name = name;
            Kind = kind;
            Definition = definition;
        }
    }
}