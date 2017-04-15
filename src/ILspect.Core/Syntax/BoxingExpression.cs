using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class BoxingExpression : Expression
    {
        public Expression Value { get; }

        public BoxingExpression(Expression value, Instruction instruction) : base(instruction)
        {
            Value = value;
        }

        public override string ToString()
        {
            return $"__box({Value},)";
        }
    }
}