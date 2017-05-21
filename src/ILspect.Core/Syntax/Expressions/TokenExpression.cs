using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    internal class TokenExpression : Expression
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
    }
}