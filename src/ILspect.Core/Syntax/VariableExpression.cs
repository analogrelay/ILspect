using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class VariableExpression : Expression
    {
        public VariableDefinition Variable { get; }

        public VariableExpression(VariableDefinition variable, Instruction instruction) : base(instruction)
        {
            Variable = variable;
        }

        public override string ToString()
        {
            return $"_{Variable.Index}";
        }
    }
}