using ILspect.Syntax.Expressions;
using Mono.Cecil.Cil;

namespace ILspect.Syntax.Statements
{
    public class ExpressionStatement : Statement
    {
        public Expression Expression { get; }

        public ExpressionStatement(Expression expression)
            : this(expression, instruction: null) { }

        public ExpressionStatement(Expression expression, Instruction instruction) : base(instruction)
        {
            Expression = expression;
        }

        public override string ToString()
        {
            return Expression.ToString();
        }
    }
}