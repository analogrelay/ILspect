using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class LoadIndirectExpression : Expression
    {
        public Expression Address { get; }
        public MetadataType Type { get; }

        public LoadIndirectExpression(Expression address, MetadataType type, Instruction instruction) : base(instruction)
        {
            Address = address;
            Type = type;
        }

        public override string ToString()
        {
            return $"*(({Type}*){Address})";
        }
    }
}
