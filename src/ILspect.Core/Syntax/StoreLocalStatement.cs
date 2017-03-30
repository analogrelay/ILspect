namespace ILspect.Syntax
{
    public class StoreLocalStatement : Statement
    {
        public int Index { get; }
        public SyntaxNode Value { get; }

        public StoreLocalStatement(int index, SyntaxNode value)
        {
            Index = index;
            Value = value;
        }

        public override string ToString()
        {
            return $"loc[{Index}] = {Value}";
        }
    }
}