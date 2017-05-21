﻿using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class BoxingExpression : Expression
    {
        public Expression Value { get; }
        public TypeReference Type { get; }

        public BoxingExpression(Expression value, TypeReference type)
            : this(value, type, instruction: null) { }

        public BoxingExpression(Expression value, TypeReference type, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
        }

        public override string ToString()
        {
            return $"__box({Value},{Type.FullName})";
        }
    }
}