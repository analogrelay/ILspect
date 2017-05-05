using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class StoreTemporaryStatement : Statement
    {
        public int Index { get; }
        public Expression Value { get; }

        public StoreTemporaryStatement(int index, Expression value, Instruction instruction) : base(instruction)
        {
            Index = index;
            Value = value;
        }

        public override string ToString()
        {
            return $"_t{Index} = {Value}";
        }
    }
}