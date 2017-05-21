using ILspect.Syntax.Expressions;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Statements
{
    public class AssignmentStatement : Statement
    {
        public VariableReference Variable { get; }
        public Expression Value { get; }

        public AssignmentStatement(VariableReference variable, Expression value)
            : this(variable, value, instruction: null) { }

        public AssignmentStatement(VariableReference variable, Expression value, Instruction instruction) : base(instruction)
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