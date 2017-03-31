using System;
using System.Collections.Generic;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    internal class BinaryExpression : Expression
    {
        private static readonly Dictionary<BinaryOperator, string> _operators = new Dictionary<BinaryOperator, string>()
        {
            {BinaryOperator.LessThan, "<" }
        };

        public Expression Value1 { get; }
        public Expression Value2 { get; }
        public BinaryOperator Operator { get; }

        public BinaryExpression(Expression value1, Expression value2, BinaryOperator @operator, Instruction instruction) : base(instruction)
        {
            Value1 = value1;
            Value2 = value2;
            Operator = @operator;
        }

        public override string ToString()
        {
            if(!_operators.TryGetValue(Operator, out var operatorStr))
            {
                throw new InvalidOperationException($"Unknown operator: {Operator}");
            }
            return $"{Value1} {operatorStr} {Value2}";
        }
    }
}