using System;
using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class CallExpression : Expression, IEquatable<CallExpression>
    {
        public MethodReference Method { get; }
        public Expression Target { get; }
        public IList<Expression> Arguments { get; }
        public CallType Type { get; }

        public CallExpression(MethodReference method, CallType type, Expression target, IList<Expression> arguments)
            : this(method, type, target, arguments, instruction: null) { }

        public CallExpression(MethodReference method, CallType type, Expression target, IList<Expression> arguments, Instruction instruction) : base(instruction)
        {
            Type = type;
            Method = method;
            Target = target;
            Arguments = arguments;
        }

        public override string ToString()
        {
            var args = string.Join(", ", Arguments.Select(a => a.ToString()));

            if (Type == CallType.Constructor)
            {
                return $"new {Method.DeclaringType.FullName}({args})";
            }
            else if (Target == null)
            {
                return $"{Method.DeclaringType.FullName}::{Method.Name}({args})";
            }
            else
            {
                return $"{Target}.{Method.Name}({args})";
            }
        }

        public override bool Equals(object obj) => obj is CallExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Method);
            combiner.Add(Target);
            combiner.Add(Arguments);
            combiner.Add(Type);
            return combiner.CombinedHash;
        }

        public bool Equals(CallExpression other)
        {
            return base.Equals(other) &&
                Equals(Method, other.Method) &&
                Equals(Target, other.Target) &&
                Enumerable.SequenceEqual(Arguments, other.Arguments) &&
                Type == other.Type;
        }
    }
}