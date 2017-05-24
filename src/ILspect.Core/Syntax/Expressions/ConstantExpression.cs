using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class ConstantExpression : Expression, IEquatable<ConstantExpression>
    {
        public object Value { get; }
        public MetadataType Type { get; }

        public ConstantExpression(object value, MetadataType type)
            : this(value, type, instruction: null) { }

        public ConstantExpression(object value, MetadataType type, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
        }

        public override string ToString()
        {
            switch (Value)
            {
                case string s:
                    return "\"" + s + "\"";
                case null:
                    return "null";
                default:
                    return Value.ToString();
            }
        }

        public override bool Equals(object obj) => obj is ConstantExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Value);
            combiner.Add(Type);
            return combiner.CombinedHash;
        }

        public bool Equals(ConstantExpression other)
        {
            return base.Equals(other) &&
                Equals(Value, other.Value) &&
                Type == other.Type;
        }
    }
}
