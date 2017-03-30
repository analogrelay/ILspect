namespace ILspect.Syntax
{
    public class ArgumentReference : SyntaxNode
    {
        public int Index { get; }

        public ArgumentReference(int index)
        {
            Index = index;
        }

        public override string ToString()
        {
            return $"args[{Index}]";
        }
    }
}
