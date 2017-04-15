using System;
using System.Collections.Generic;

namespace ILspect.Syntax
{
    public enum BinaryOperator
    {
        Add,
        LessThan,
        Equal,
        NotEqual,
        GreaterThanOrEqual,
        GreaterThan,
        LessThanOrEqual
    }

    public static class BinaryOperatorExtensions
    {
        private static readonly Dictionary<BinaryOperator, string> _symbols = new Dictionary<BinaryOperator, string>()
        {
            { BinaryOperator.Add, "+" },
            { BinaryOperator.LessThan, "<" },
            { BinaryOperator.Equal, "==" },
            { BinaryOperator.NotEqual, "!=" },
            { BinaryOperator.GreaterThanOrEqual, ">=" },
            { BinaryOperator.GreaterThan, ">" },
            { BinaryOperator.LessThanOrEqual, "<=" },
        };

        public static string GetSymbol(this BinaryOperator self)
        {
            if (!_symbols.TryGetValue(self, out var symbol))
            {
                throw new InvalidOperationException($"Unknown symbol: {self}");
            }
            return symbol;
        }
    }
}