using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class LocallocExpression : Expression
    {
        public Expression Size { get; }

        public LocallocExpression(Expression size, Instruction instruction) : base(instruction)
        {
            Size = size;
        }

        public override string ToString()
        {
            return $"__localloc({Size})";
        }
    }
}
