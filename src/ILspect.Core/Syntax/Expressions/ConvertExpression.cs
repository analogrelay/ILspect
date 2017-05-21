using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class ConvertExpression : Expression
    {
        public Expression Value { get; }
        public MetadataType Type { get; }
        public bool WithOverflowDetection { get; }
        public bool Unsigned { get; }

        public ConvertExpression(Expression value, MetadataType type, bool withOverflowDetection, bool unsigned)
            : this(value, type, withOverflowDetection, unsigned, instruction: null) { }

        public ConvertExpression(Expression value, MetadataType type, bool withOverflowDetection, bool unsigned, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
            WithOverflowDetection = withOverflowDetection;
            Unsigned = unsigned;
        }

        public override string ToString()
        {
            return $"({Type}){Value}";
        }
    }
}
