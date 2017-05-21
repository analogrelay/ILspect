using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class ConstantExpression : Expression
    {
        public object Value { get; }
        public MetadataType Type { get; }

        public ConstantExpression(object value, MetadataType type)
            : this(value, type, instruction: null) { }

        public ConstantExpression(object value, MetadataType type, Instruction instruction) : base(instruction)
        {
            Value = value;
            Type = type;
        }

        public override string ToString()
        {
            switch (Value)
            {
                case string s:
                    return "\"" + s + "\"";
                case null:
                    return "null";
                default:
                    return Value.ToString();
            }
        }
    }
}
