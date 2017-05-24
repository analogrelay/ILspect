using System;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class TemporaryExpression : Expression, IEquatable<TemporaryExpression>
    {
        public Temporary Temporary { get; }

        public TemporaryExpression(Temporary temporary)
            : this(temporary, instruction: null) { }

        public TemporaryExpression(Temporary temporary, Instruction instruction) : base(instruction)
        {
            Temporary = temporary;
        }

        public override string ToString()
        {
            return Temporary.ToString();
        }

        public override bool Equals(object obj) => obj is TemporaryExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Temporary);
            return combiner.CombinedHash;
        }

        public bool Equals(TemporaryExpression other)
        {
            return base.Equals(other) &&
                Equals(Temporary, other.Temporary);
        }
    }
}