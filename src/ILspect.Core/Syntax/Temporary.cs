namespace ILspect.Syntax
{
    public class Temporary
    {
        public int Index { get; }

        public Temporary(int index)
        {
            Index = index;
        }

        public override string ToString()
        {
            return $"_t{Index}";
        }
    }
}