using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class ParameterExpression : Expression
    {
        public ParameterDefinition Parameter { get; }

        public ParameterExpression(ParameterDefinition parameter, Instruction instruction) : base(instruction)
        {
            Parameter = parameter;
        }

        public override string ToString()
        {
            return Parameter.Name;
        }
    }
}
