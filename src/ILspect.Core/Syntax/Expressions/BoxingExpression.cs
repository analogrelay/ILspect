using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class BoxingExpression : Expression, IEquatable<BoxingExpression>
    {
        public Expression Value { get; }
        public TypeReference Type { get; }

        public BoxingExpression(Expression value, TypeReference type)
            : this(value, type, instruction: null) { }

        public BoxingExpression(Expression value, TypeReference type, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
        }

        public override string ToString()
        {
            return $"__box({Value},{Type.FullName})";
        }

        public override bool Equals(object obj) => obj is BoxingExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Value);
            combiner.Add(Type);
            return combiner.CombinedHash;
        }

        public bool Equals(BoxingExpression other)
        {
            return base.Equals(other) &&
                Equals(Value, other.Value) &&
                Type == other.Type;
        }
    }
}