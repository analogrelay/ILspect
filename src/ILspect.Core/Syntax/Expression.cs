using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public abstract class Expression : SyntaxNode
    {
        public Expression(Instruction instruction) : base(instruction)
        {
        }
    }
}
