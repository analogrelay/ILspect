using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class TokenExpression : Expression, IEquatable<TokenExpression>
    {
        public MemberReference Token { get; }

        public TokenExpression(MemberReference token)
            : this(token, instruction: null) { }

        public TokenExpression(MemberReference token, Instruction instruction) : base(instruction)
        {
            Token = token;
        }

        public override string ToString()
        {
            return $"__ldtoken({Token.FullName})";
        }

        public override bool Equals(object obj) => obj is TokenExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Token);
            return combiner.CombinedHash;
        }

        public bool Equals(TokenExpression other)
        {
            return base.Equals(other) &&
                Equals(Token, other.Token);
        }
    }
}