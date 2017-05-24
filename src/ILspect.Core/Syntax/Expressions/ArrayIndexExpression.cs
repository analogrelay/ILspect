using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    internal class ArrayIndexExpression : Expression, IEquatable<ArrayIndexExpression>
    {
        public Expression Array { get; }
        public Expression Index { get; }
        public MetadataType Type { get; }
        public TypeReference ObjectType { get; }

        public ArrayIndexExpression(Expression array, Expression index, MetadataType type, TypeReference objectType)
            : this(array, index, type, objectType, instruction: null) { }

        public ArrayIndexExpression(Expression array, Expression index, MetadataType type, TypeReference objectType, Instruction instruction) : base(instruction)
        {
            Array = array;
            Index = index;
            Type = type;
            ObjectType = objectType;
        }

        public override string ToString()
        {
            return $"{Array}[{Index}]";
        }

        public override bool Equals(object obj) => obj is ArrayIndexExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Array);
            combiner.Add(Index);
            combiner.Add(Type);
            combiner.Add(ObjectType);
            return combiner.CombinedHash;
        }

        public bool Equals(ArrayIndexExpression other)
        {
            return base.Equals(other) &&
                Equals(Array, other.Array) &&
                Equals(Index, other.Index) &&
                Equals(ObjectType, other.ObjectType) &&
                Type == other.Type;
        }
    }
}