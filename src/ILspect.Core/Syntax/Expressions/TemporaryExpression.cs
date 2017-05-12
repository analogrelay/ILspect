using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class TemporaryExpression : Expression
    {
        public Temporary Temporary { get; }

        public TemporaryExpression(Temporary temporary, Instruction instruction) : base(instruction)
        {
            Temporary = temporary;
        }

        public override string ToString()
        {
            return Temporary.ToString();
        }
    }
}