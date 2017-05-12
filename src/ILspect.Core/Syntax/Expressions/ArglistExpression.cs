using System;
using System.Collections.Generic;
using System.Text;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Expressions
{
    public class ArglistExpression : Expression
    {
        public ArglistExpression(Instruction instruction) : base(instruction)
        {
        }

        public override string ToString()
        {
            return "__arglist";
        }
    }
}
