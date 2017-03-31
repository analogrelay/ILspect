using System;
using System.Collections.Generic;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class UnaryExpression : Expression
    {
        private static readonly Dictionary<UnaryOperator, string> _operators = new Dictionary<UnaryOperator, string>()
        {
            {UnaryOperator.Negate, "-" }
        };

        public Expression Value { get; }
        public UnaryOperator Operator {get;}

        public UnaryExpression(Expression value, UnaryOperator @operator, Instruction instruction) : base(instruction)
        {
            Value = value;
            Operator = @operator;
        }

        public override string ToString()
        {
            if(!_operators.TryGetValue(Operator, out var operatorStr))
            {
                throw new InvalidOperationException($"Unknown operator: {Operator}");
            }
            return $"{operatorStr}{Value}";
        }
    }
}