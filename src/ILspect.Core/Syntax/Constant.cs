using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class Constant : Expression
    {
        public object Value { get; }
        public MetadataType Type { get; }

        public Constant(int value, MetadataType type, Instruction instruction) : base(instruction)
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