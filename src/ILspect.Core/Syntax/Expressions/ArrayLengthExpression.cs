using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    internal class ArrayLengthExpression : Expression
    {
        public Expression Array { get; }

        public ArrayLengthExpression(Expression array)
            : this(array, instruction: null) { }

        public ArrayLengthExpression(Expression array, Instruction instruction) : base(instruction)
        {
            Array = array;
        }

        public override string ToString()
        {
            return $"{Array}.Length";
        }
    }
}