using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class ConvertExpression : Expression
    {
        public Expression Value { get; }
        public MetadataType Type { get; }

        public ConvertExpression(Expression value, MetadataType type, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
        }

        public override string ToString()
        {
            return $"({Type}){Value}";
        }
    }
}