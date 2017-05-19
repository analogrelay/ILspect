using ILspect.Syntax.Expressions;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Statements
{
    public class StoreParameterStatement : Statement
    {
        public ParameterReference Parameter { get; }
        public Expression Value { get; }

        public StoreParameterStatement(ParameterReference parameter, Expression value, Instruction instruction) : base(instruction)
        {
            Parameter = parameter;
            Value = value;
        }

        public override string ToString()
        {
            return $"{Parameter.Name} = {Value}";
        }
    }
}