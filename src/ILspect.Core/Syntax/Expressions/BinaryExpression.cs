using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    internal class BinaryExpression : Expression
    {
        public Expression Value1 { get; }
        public Expression Value2 { get; }
        public BinaryOperator Operator { get; }
        public bool WithOverflowDetection { get; }

        public BinaryExpression(Expression value1, Expression value2, BinaryOperator @operator, bool withOverflowDetection, Instruction instruction) : base(instruction)
        {
            Value1 = value1;
            Value2 = value2;
            Operator = @operator;
            WithOverflowDetection = withOverflowDetection;
        }

        public override string ToString()
        {
            return $"({Value1}) {Operator.GetSymbol()} ({Value2})";
        }
    }
}
