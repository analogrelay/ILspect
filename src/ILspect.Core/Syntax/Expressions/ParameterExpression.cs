using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class ParameterExpression : Expression
    {
        public ParameterReference Parameter { get; }

        public ParameterExpression(ParameterReference parameter, Instruction instruction) : base(instruction)
        {
            Parameter = parameter;
        }

        public override string ToString()
        {
            return Parameter.Name;
        }
    }
}
