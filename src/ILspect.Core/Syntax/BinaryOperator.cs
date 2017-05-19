using System;
using System.Collections.Generic;

namespace ILspect.Syntax
{
    public enum BinaryOperator
    {
        Add,
        And,
        Divide,
        LessThan,
        Equal,
        NotEqual,
        GreaterThanOrEqual,
        GreaterThan,
        LessThanOrEqual,
        Multiply,
        BitOr,
        Remainder,
        ShiftLeft,
        ShiftRight,
        Subtract,
        BitXor,
    }

    public static class BinaryOperatorExtensions
    {
        private static readonly Dictionary<BinaryOperator, string> _symbols = new Dictionary<BinaryOperator, string>()
        {
            { BinaryOperator.Add, "+" },
            { BinaryOperator.And, "&" },
            { BinaryOperator.Divide, "/" },
            { BinaryOperator.LessThan, "<" },
            { BinaryOperator.Equal, "==" },
            { BinaryOperator.NotEqual, "!=" },
            { BinaryOperator.GreaterThanOrEqual, ">=" },
            { BinaryOperator.GreaterThan, ">" },
            { BinaryOperator.LessThanOrEqual, "<=" },
            { BinaryOperator.Multiply, "*" },
            { BinaryOperator.BitOr, "|" },
            { BinaryOperator.Remainder, "%" },
            { BinaryOperator.ShiftLeft, "<<" },
            { BinaryOperator.ShiftRight, ">>" },
            { BinaryOperator.Subtract, "-" },
            { BinaryOperator.BitXor, "^" },
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
