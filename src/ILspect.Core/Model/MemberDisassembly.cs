using System.IO;
using Mono.Cecil;

namespace ILspect.Model
{
    public class MemberDisassembly
    {
        public string Name => Definition.Name;
        public MemberType MemberType { get; }
        public IMemberDefinition Definition { get; }

        public MemberDisassembly(IMemberDefinition memberDefinition)
        {
            Definition = memberDefinition;
            MemberType = GetMemberType(memberDefinition);
        }

        private static MemberType GetMemberType(IMemberDefinition memberDefinition)
        {
            switch (memberDefinition)
            {
                case TypeDefinition _: return MemberType.NestedType;
                case FieldDefinition _: return MemberType.Field;
                case PropertyDefinition _: return MemberType.Property;
                case EventDefinition _: return MemberType.Event;
                case MethodDefinition _: return MemberType.Method;
                default:
                    throw new InvalidDataException($"Unknown member type: {memberDefinition.GetType().FullName}");
            }
        }
    }
}