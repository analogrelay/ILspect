using System;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class UnaryExpression : Expression, IEquatable<UnaryExpression>
    {
        public Expression Value { get; }
        public UnaryOperator Operator { get; }

        public UnaryExpression(Expression value, UnaryOperator @operator)
            : this(value, @operator, instruction: null) { }

        public UnaryExpression(Expression value, UnaryOperator @operator, Instruction instruction) : base(instruction)
        {
            Value = value;
            Operator = @operator;
        }

        public override string ToString()
        {
            return $"{Operator.GetSymbol()}({Value})";
        }

        public override bool Equals(object obj) => obj is UnaryExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Value);
            combiner.Add(Operator);
            return combiner.CombinedHash;
        }

        public bool Equals(UnaryExpression other)
        {
            return base.Equals(other) &&
                Equals(Value, other.Value) &&
                Operator == other.Operator;
        }
    }
}