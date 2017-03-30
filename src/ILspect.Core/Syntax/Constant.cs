using Mono.Cecil;

namespace ILspect.Syntax
{
    public class Constant : SyntaxNode
    {
        public object Value { get; }
        public MetadataType Type { get; }

        public Constant(int value, MetadataType type)
        {
            Value = value;
            Type = type;
        }

        public override string ToString()
        {
            return Value.ToString();
        }
    }
}