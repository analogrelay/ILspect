using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class DiscardStatement : Statement
    {
        public Expression Value { get; }

        public DiscardStatement(Expression value, Instruction instruction) : base(instruction)
        {
            Value = value;
        }

        public override string ToString()
        {
            return $"__discard({Value})";
        }
    }
}