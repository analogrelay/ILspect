using System;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public abstract class Expression : IEquatable<Expression>
    {
        public Instruction Instruction { get; }

        public Expression(Instruction instruction)
        {
            Instruction = instruction;
        }

        public override bool Equals(object obj) => obj is Expression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(Instruction);
            return combiner.CombinedHash;
        }

        public bool Equals(Expression other)
        {
            return !ReferenceEquals(other, null) &&
                Equals(other.GetType() == GetType()) &&
                Equals(Instruction, other.Instruction);
        }
    }
}
