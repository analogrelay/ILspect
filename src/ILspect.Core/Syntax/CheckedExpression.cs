using System;
using System.Collections.Generic;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class CheckedExpression : Expression
    {
        public Expression Value { get; }

        public CheckedExpression(Expression value, Instruction instruction) : base(instruction)
        {
            Value = value;
        }

        public override string ToString()
        {
            return $"__checked({Value})";
        }
    }
}