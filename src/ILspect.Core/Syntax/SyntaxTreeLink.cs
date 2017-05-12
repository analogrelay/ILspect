using ILspect.Syntax.Expressions;

namespace ILspect.Syntax
{
    public class SyntaxTreeLink
    {
        public Expression Expression { get; }
        public SyntaxTreeNode Target { get; }

        public SyntaxTreeLink(Expression expression, SyntaxTreeNode target)
        {
            Expression = expression;
            Target = target;
        }
    }
}