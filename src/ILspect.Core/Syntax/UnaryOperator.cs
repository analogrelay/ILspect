using System;
using System.Collections.Generic;

namespace ILspect.Syntax
{
    public enum UnaryOperator
    {
        Negate,
        AddressOf
    }

    public static class UnaryOperatorExtensions
    {
        private static readonly Dictionary<UnaryOperator, string> _symbols = new Dictionary<UnaryOperator, string>()
        {
            { UnaryOperator.Negate, "-" },
            { UnaryOperator.AddressOf, "&" },
        };

        public static string GetSymbol(this UnaryOperator self)
        {
            if (!_symbols.TryGetValue(self, out var symbol))
            {
                throw new InvalidOperationException($"Unknown symbol: {self}");
            }
            return symbol;
        }
    }
}