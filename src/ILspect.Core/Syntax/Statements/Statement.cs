using Mono.Cecil.Cil;

namespace ILspect.Syntax.Statements
{
    public abstract class Statement
    {
        public Instruction Instruction { get; }

        public Statement(Instruction instruction)
        {
            Instruction = instruction;
        }
    }
}