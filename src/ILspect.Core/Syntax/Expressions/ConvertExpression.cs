using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class ConvertExpression : Expression, IEquatable<ConvertExpression>
    {
        public Expression Value { get; }
        public MetadataType Type { get; }
        public bool WithOverflowDetection { get; }
        public bool Unsigned { get; }

        public ConvertExpression(Expression value, MetadataType type, bool withOverflowDetection, bool unsigned)
            : this(value, type, withOverflowDetection, unsigned, instruction: null) { }

        public ConvertExpression(Expression value, MetadataType type, bool withOverflowDetection, bool unsigned, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
            WithOverflowDetection = withOverflowDetection;
            Unsigned = unsigned;
        }

        public override string ToString()
        {
            return $"({Type}){Value}";
        }

        public override bool Equals(object obj) => obj is ConvertExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Value);
            combiner.Add(Type);
            combiner.Add(WithOverflowDetection);
            combiner.Add(Unsigned);
            return combiner.CombinedHash;
        }

        public bool Equals(ConvertExpression other)
        {
            return base.Equals(other) &&
                Equals(Value, other.Value) &&
                Type == other.Type &&
                WithOverflowDetection == other.WithOverflowDetection &&
                Unsigned == other.Unsigned;
        }
    }
}
