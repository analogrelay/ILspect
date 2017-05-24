using System;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    internal class ArrayLengthExpression : Expression, IEquatable<ArrayLengthExpression>
    {
        public Expression Array { get; }

        public ArrayLengthExpression(Expression array)
            : this(array, instruction: null) { }

        public ArrayLengthExpression(Expression array, Instruction instruction) : base(instruction)
        {
            Array = array;
        }

        public override string ToString()
        {
            return $"{Array}.Length";
        }

        public override bool Equals(object obj) => obj is ArrayLengthExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Array);
            return combiner.CombinedHash;
        }

        public bool Equals(ArrayLengthExpression other)
        {
            return base.Equals(other) &&
                Equals(Array, other.Array);
        }
    }
}