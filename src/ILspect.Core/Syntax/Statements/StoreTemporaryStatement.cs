using ILspect.Syntax.Expressions;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Statements
{
    public class StoreTemporaryStatement : Statement
    {
        public Temporary Temporary { get; }
        public Expression Value { get; }

        public StoreTemporaryStatement(Temporary temporary, Expression value)
            : this(temporary, value, instruction: null) { }

        public StoreTemporaryStatement(Temporary temporary, Expression value, Instruction instruction) : base(instruction)
        {
            Temporary = temporary;
            Value = value;
        }

        public override string ToString()
        {
            return $"{Temporary} = {Value}";
        }
    }
}