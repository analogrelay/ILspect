using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class AssignmentStatement : Statement
    {
        public VariableDefinition Variable { get; }
        public Expression Value { get; }

        public AssignmentStatement(VariableDefinition variable, Expression value, Instruction instruction) : base(instruction)
        {
            Variable = variable;
            Value = value;
        }

        public override string ToString()
        {
            return $"_{Variable.Index} = {Value}";
        }
    }
}