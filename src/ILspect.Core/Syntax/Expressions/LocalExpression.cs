using System;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class LocalExpression : Expression, IEquatable<LocalExpression>
    {
        public VariableReference Variable { get; }

        public LocalExpression(VariableReference variable)
            : this(variable, instruction: null) { }

        public LocalExpression(VariableReference variable, Instruction instruction) : base(instruction)
        {
            Variable = variable;
        }

        public override string ToString()
        {
            return $"_{Variable.Index}";
        }

        public override bool Equals(object obj) => obj is LocalExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Variable);
            return combiner.CombinedHash;
        }

        public bool Equals(LocalExpression other)
        {
            return base.Equals(other) &&
                Equals(Variable, other.Variable);
        }
    }
}