using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class VariableReference : Expression
    {
        public VariableDefinition Variable { get; }

        public VariableReference(VariableDefinition variable, Instruction instruction) : base(instruction)
        {
            Variable = variable;
        }

        public override string ToString()
        {
            return $"_{Variable.Index}";
        }
    }
}