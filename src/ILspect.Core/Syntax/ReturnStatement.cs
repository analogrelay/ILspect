namespace ILspect.Syntax
{
    public class ReturnStatement : Statement
    {
        public SyntaxNode Value { get; }

        public ReturnStatement(SyntaxNode value)
        {
            Value = value;
        }

        public override string ToString()
        {
            return $"return {Value}";
        }
    }
}