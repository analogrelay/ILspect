using System;
using System.Collections.Generic;

namespace ILspect.Syntax
{
    internal class BinaryExpression : SyntaxNode
    {
        private static readonly Dictionary<BinaryOperator, string> _operators = new Dictionary<BinaryOperator, string>()
        {
            {BinaryOperator.LessThan, "<" }
        };

        public SyntaxNode Value1 { get; }
        public SyntaxNode Value2 { get; }
        public BinaryOperator Operator { get; }

        public BinaryExpression(SyntaxNode value1, SyntaxNode value2, BinaryOperator @operator)
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