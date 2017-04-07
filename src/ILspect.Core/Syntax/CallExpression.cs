using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
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
            var call = $"{Method.Name}({args}) // Call Type: {Type}";

            if (Target == null)
            {
                return $"{Method.DeclaringType.FullName}::{call}";
            }
            else
            {
                return $"{Target}.{call}";
            }
        }
    }
}