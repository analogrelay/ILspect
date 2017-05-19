using System;
using System.Collections.Generic;
using System.Text;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class FieldExpression : Expression
    {
        public Expression Instance { get; }
        public FieldReference Field { get; }

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
    }
}
