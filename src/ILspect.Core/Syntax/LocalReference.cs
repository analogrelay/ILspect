namespace ILspect.Syntax
{
    public class LocalReference : SyntaxNode
    {
        public int Index { get; }

        public LocalReference(int index)
        {
            Index = index;
        }

        public override string ToString()
        {
            return $"loc[{Index}]";
        }
    }
}