using System;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class BinaryExpression : Expression, IEquatable<BinaryExpression>
    {
        public Expression Value1 { get; }
        public Expression Value2 { get; }
        public BinaryOperator Operator { get; }
        public bool WithOverflowDetection { get; }
        public bool Unsigned { get; }

        public BinaryExpression(Expression value1, Expression value2, BinaryOperator @operator, bool withOverflowDetection, bool unsigned)
            : this(value1, value2, @operator, withOverflowDetection, unsigned, instruction: null) { }

        public BinaryExpression(Expression value1, Expression value2, BinaryOperator @operator, bool withOverflowDetection, bool unsigned, Instruction instruction) : base(instruction)
        {
            Value1 = value1;
            Value2 = value2;
            Operator = @operator;
            WithOverflowDetection = withOverflowDetection;
            Unsigned = unsigned;
        }

        public override string ToString()
        {
            return $"({Value1}) {Operator.GetSymbol()} ({Value2})";
        }

        public override bool Equals(object obj) => obj is BinaryExpression expr && Equals(expr);

        public override int GetHashCode()
        {
            var combiner = new HashCodeCombiner();
            combiner.Add(base.GetHashCode());
            combiner.Add(Value1);
            combiner.Add(Value2);
            combiner.Add(Operator);
            combiner.Add(WithOverflowDetection);
            combiner.Add(Unsigned);
            return combiner.CombinedHash;
        }

        public bool Equals(BinaryExpression other)
        {
            return base.Equals(other) &&
                Equals(Value1, other.Value1) &&
                Equals(Value2, other.Value2) &&
                Operator == other.Operator &&
                WithOverflowDetection == other.WithOverflowDetection &&
                Unsigned == other.Unsigned;
        }
    }
}
