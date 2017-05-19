using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class DereferenceExpression : Expression
    {
        public Expression Address { get; }
        public MetadataType Type { get; }
        public TypeReference ObjectType { get; }

        public DereferenceExpression(Expression address, MetadataType type, Instruction instruction)
            : this(address, type, objectType: null, instruction: instruction) { }

        public DereferenceExpression(Expression address, TypeReference objectType, Instruction instruction)
            : this(address, type: MetadataType.Object, objectType: objectType, instruction: instruction) { }

        private DereferenceExpression(Expression address, MetadataType type, TypeReference objectType, Instruction instruction) : base(instruction)
        {
            Address = address;
            Type = type;
            ObjectType = objectType;
        }

        public override string ToString()
        {
            var typeName = Type == MetadataType.Object ?
                ObjectType.FullName :
                Type.ToString();
            return $"*(({typeName}&){Address})";
        }
    }
}
