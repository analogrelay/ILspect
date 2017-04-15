using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class UnaryExpression : Expression
    {
        public Expression Value { get; }
        public UnaryOperator Operator {get;}

        public UnaryExpression(Expression value, UnaryOperator @operator, Instruction instruction) : base(instruction)
        {
            Value = value;
            Operator = @operator;
        }

        public override string ToString()
        {
            return $"{Operator.GetSymbol()}{Value}";
        }
    }
}