using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class CastExpression : Expression
    {
        public Expression Value { get; }
        public TypeReference Type { get; }

        public CastExpression(Expression value, TypeReference type)
            : this(value, type, instruction: null) { }

        public CastExpression(Expression value, TypeReference type, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
        }

        public override string ToString()
        {
            return $"({Type.FullName}){Value}";
        }
    }
}
