using Mono.Cecil;

namespace ILspect.Server.Data
{
    public class MemberEntry
    {
        public TypeEntry Type { get; }
        public string Name { get; }
        public MemberKind Kind { get; }
        public IMemberDefinition Definition { get; }
        
        public MemberEntry(TypeEntry type, string name, MemberKind kind, IMemberDefinition definition)
        {
            Type = type;
            Name = name;
            Kind = kind;
            Definition = definition;
        }
    }
}