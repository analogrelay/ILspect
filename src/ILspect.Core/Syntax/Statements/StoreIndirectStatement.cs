using ILspect.Syntax.Expressions;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Statements
{
    public class StoreIndirectStatement : Statement
    {
        public Expression Address { get; }
        public Expression Value { get; }
        public MetadataType Type { get; }

        public StoreIndirectStatement(Expression address, Expression value, MetadataType type, Instruction instruction) : base(instruction)
        {
            Address = address;
            Value = value;
            Type = type;
        }

        public override string ToString()
        {
            return $"*(({Type}*){Address}) = {Value}";
        }
    }
}