using ILspect.Syntax.Expressions;

namespace ILspect.Syntax
{
    public class SyntaxGraphLink
    {
        public Expression Expression { get; }
        public SyntaxGraphNode Target { get; }

        public SyntaxGraphLink(Expression expression, SyntaxGraphNode target)
        {
            Expression = expression;
            Target = target;
        }
    }
}