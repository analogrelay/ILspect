using System;
using System.Collections.Generic;
using System.Text;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class FieldExpression : Expression, IEquatable<FieldExpression>
    {
        public Expression Instance { get; }
        public FieldReference Field { get; }

        public FieldExpression(Expression instance, FieldReference field)
            : this(instance, field, instruction: null) { }

        public FieldExpression(Expression instance, FieldReference field, Instruction instruction) : base(instruction)
        {
            Instance = instance;
            Field = field;
        }

        public override string ToString()
        {
            if (Instance == null)
            {
                return $"{Field.DeclaringType.FullName}::{Field.Name}";
            }
            else
            {
                return $"{Instance}.{Field.Name}";
            }
        }

        public override bool Equals(object obj) => obj is FieldExpression e && Equals(e);

        public override int GetHashCode()
        {
            var combiner = HashCodeCombiner.Start();
            combiner.Add(base.GetHashCode());
            combiner.Add(Instance);
            combiner.Add(Field);
            return combiner.CombinedHash;
        }

        public bool Equals(FieldExpression other)
        {
            return base.Equals(other) &&
                Equals(Instance, other.Instance) &&
                Equals(Field, other.Field);
        }
    }
}
