using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class ImplicitValueExpression : Expression, IEquatable<ImplicitValueExpression>
    {
        public static readonly ImplicitValueExpression Exception = new ImplicitValueExpression("exception");

        public string Value { get; }

        private ImplicitValueExpression(string value) : base(instruction: null)
        {
            Value = value;
        }

        public override int GetHashCode() => Value.GetHashCode();

        public override bool Equals(object obj) => Equals(obj as ImplicitValueExpression);

        public bool Equals(ImplicitValueExpression other)
        {
            return other != null && string.Equals(other.Value, Value, StringComparison.Ordinal);
        }

        public override string ToString() => $"${Value}";
    }
}