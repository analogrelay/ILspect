using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class ConvertExpression : Expression
    {
        public Expression Value { get; }
        public MetadataType Type { get; }
        public bool WithOverflowDetection { get; }

        public ConvertExpression(Expression value, MetadataType type, bool withOverflowDetection, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
            WithOverflowDetection = withOverflowDetection;
        }

        public override string ToString()
        {
            return $"({Type}){Value}";
        }
    }
}
