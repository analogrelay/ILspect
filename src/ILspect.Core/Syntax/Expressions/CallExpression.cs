using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class CallExpression : Expression
    {
        public MethodReference Method { get; }
        public Expression Target { get; }
        public IList<Expression> Arguments { get; }
        public CallType Type { get; }

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

            if(Type == CallType.Constructor)
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
    }
}