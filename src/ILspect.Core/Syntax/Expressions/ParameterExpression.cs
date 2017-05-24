using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class ParameterExpression : Expression, IEquatable<ParameterExpression>
    {
        public ParameterReference Parameter { get; }

        public ParameterExpression(ParameterReference parameter)
            : this(parameter, instruction: null) { }

        public ParameterExpression(ParameterReference parameter, Instruction instruction) : base(instruction)
        {
            Parameter = parameter;
        }

        public override string ToString()
        {
            return Parameter.Name;
        }

        public override bool Equals(object obj) => obj is ParameterExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Parameter);
            return combiner.CombinedHash;
        }

        public bool Equals(ParameterExpression other)
        {
            return base.Equals(other) &&
                Equals(Parameter, other.Parameter);
        }
    }
}
