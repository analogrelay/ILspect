using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class CastExpression : Expression, IEquatable<CastExpression>
    {
        public Expression Value { get; }
        public TypeReference Type { get; }

        public CastExpression(Expression value, TypeReference type)
            : this(value, type, instruction: null) { }

        public CastExpression(Expression value, TypeReference type, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
        }

        public override string ToString()
        {
            return $"({Type.FullName}){Value}";
        }

        public override bool Equals(object obj) => obj is CastExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Value);
            combiner.Add(Type);
            return combiner.CombinedHash;
        }

        public bool Equals(CastExpression other)
        {
            return base.Equals(other) &&
                Equals(Value, other.Value) &&
                Equals(Type, other.Type);
        }
    }
}
