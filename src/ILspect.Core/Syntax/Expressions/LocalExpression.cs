using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class LocalExpression : Expression
    {
        public VariableReference Variable { get; }

        public LocalExpression(VariableReference variable, Instruction instruction) : base(instruction)
        {
            Variable = variable;
        }

        public override string ToString()
        {
            return $"_{Variable.Index}";
        }
    }
}