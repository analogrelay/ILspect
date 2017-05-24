using System;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class LocallocExpression : Expression, IEquatable<LocallocExpression>
    {
        public Expression Size { get; }

        public LocallocExpression(Expression size)
            : this(size, instruction: null) { }

        public LocallocExpression(Expression size, Instruction instruction) : base(instruction)
        {
            Size = size;
        }

        public override string ToString()
        {
            return $"__localloc({Size})";
        }

        public override bool Equals(object obj) => obj is LocallocExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Size);
            return combiner.CombinedHash;
        }

        public bool Equals(LocallocExpression other)
        {
            return base.Equals(other) &&
                Equals(Size, other.Size);
        }
    }
}
