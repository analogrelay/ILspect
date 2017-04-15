using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    internal class BinaryExpression : Expression
    {
        public Expression Value1 { get; }
        public Expression Value2 { get; }
        public BinaryOperator Operator { get; }

        public BinaryExpression(Expression value1, Expression value2, BinaryOperator @operator, Instruction instruction) : base(instruction)
        {
            Value1 = value1;
            Value2 = value2;
            Operator = @operator;
        }

        public override string ToString()
        {
            return $"{Value1} {Operator.GetSymbol()} {Value2}";
        }
    }
}