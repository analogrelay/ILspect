using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public abstract class SyntaxNode
    {
        public Instruction Instruction { get; }

        protected SyntaxNode(Instruction instruction)
        {
            Instruction = instruction;
        }
    }
}