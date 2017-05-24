using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class InitObjExpression : Expression, IEquatable<InitObjExpression>
    {
        public TypeReference Type { get; }

        public InitObjExpression(TypeReference type)
            : this(type, instruction: null) { }

        public InitObjExpression(TypeReference type, Instruction instruction) : base(instruction)
        {
            Type = type;
        }

        public override string ToString()
        {
            return $"default({Type})";
        }

        public override bool Equals(object obj) => obj is InitObjExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Type);
            return combiner.CombinedHash;
        }

        public bool Equals(InitObjExpression other)
        {
            return base.Equals(other) &&
                Equals(Type, other.Type);
        }
    }
}