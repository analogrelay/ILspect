using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public abstract class Expression
    {
        public Instruction Instruction { get; }

        public Expression(Instruction instruction)
        {
            Instruction = instruction;
        }
    }
}
