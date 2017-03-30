using System;
using System.Collections.Generic;

namespace ILspect.Syntax
{
    public class UnaryExpression : SyntaxNode
    {
        private static readonly Dictionary<UnaryOperator, string> _operators = new Dictionary<UnaryOperator, string>()
        {
            {UnaryOperator.Negate, "-" }
        };

        public SyntaxNode Value { get; }
        public UnaryOperator Operator {get;}

        public UnaryExpression(SyntaxNode value, UnaryOperator @operator)
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