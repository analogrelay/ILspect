using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class IsTypeExpression : Expression, IEquatable<IsTypeExpression>
    {
        public Expression Value { get; }
        public TypeReference Type { get; }

        public IsTypeExpression(Expression value, TypeReference type)
            : this(value, type, instruction: null) { }

        public IsTypeExpression(Expression value, TypeReference type, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
        }

        public override string ToString()
        {
            return $"{Value} is {Type}";
        }

        public override bool Equals(object obj) => obj is IsTypeExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Value);
            combiner.Add(Type);
            return combiner.CombinedHash;
        }

        public bool Equals(IsTypeExpression other)
        {
            return base.Equals(other) &&
                Equals(Value, other.Value) &&
                Equals(Type, other.Type);
        }
    }
}