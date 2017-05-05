using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class TemporaryExpression : Expression
    {
        public int Index { get; }

        public TemporaryExpression(int index, Instruction instruction) : base(instruction)
        {
            Index = index;
        }

        public override string ToString()
        {
            return $"_t{Index}";
        }
    }
}