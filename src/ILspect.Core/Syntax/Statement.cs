using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public abstract class Statement : SyntaxNode
    {
        public Statement(Instruction instruction) : base(instruction)
        {
        }
    }
}