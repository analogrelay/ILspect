using System.Collections.Generic;
using ILspect.Syntax.Expressions;
using ILspect.Syntax.Statements;

namespace ILspect.Syntax
{
    public class SyntaxTreeNode
    {
        private List<Statement> _statements = new List<Statement>();
        private List<SyntaxTreeLink> _outboundLinks = new List<SyntaxTreeLink>();

        public int Offset { get; }
        public string DisplayName => $"IL_{Offset:X4}";
        public IReadOnlyCollection<Statement> Statements => _statements;
        public IReadOnlyList<SyntaxTreeLink> OutboundLinks => _outboundLinks.AsReadOnly();

        public SyntaxTreeNode(int offset)
        {
            Offset = offset;
        }

        internal void AddStatement(Statement statement) => _statements.Add(statement);

        internal void AddLink(Expression expression, SyntaxTreeNode target)
        {
            _outboundLinks.Add(new SyntaxTreeLink(expression, target));
        }
    }
}