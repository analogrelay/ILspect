using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class InitObjExpression : Expression
    {
        public TypeReference Type { get; }

        public InitObjExpression(TypeReference type)
            : this(type, instruction: null) { }

        public InitObjExpression(TypeReference type, Instruction instruction) : base(instruction)
        {
            Type = type;
        }

        public override string ToString()
        {
            return $"default({Type})";
        }
    }
}