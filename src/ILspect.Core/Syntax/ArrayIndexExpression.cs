using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    internal class ArrayIndexExpression : Expression
    {
        public Expression Array { get; }
        public Expression Index { get; }
        public MetadataType Type { get; }

        public ArrayIndexExpression(Expression array, Expression index, MetadataType type, Instruction instruction) : base(instruction)
        {
            Array = array;
            Index = index;
            Type = type;
        }

        public override string ToString()
        {
            return $"{Array}[{Index}]";
        }
    }
}