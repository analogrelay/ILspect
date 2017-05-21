using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class IsTypeExpression : Expression
    {
        public Expression Value { get; }
        public TypeReference Type { get; }

        public IsTypeExpression(Expression value, TypeReference type)
            : this(value, type, instruction: null) { }

        public IsTypeExpression(Expression value, TypeReference type, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
        }

        public override string ToString()
        {
            return $"{Value} is {Type}";
        }
    }
}