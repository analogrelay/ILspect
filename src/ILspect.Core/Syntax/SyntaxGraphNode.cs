using System.Collections.Generic;
using System.Linq;
using ILspect.Syntax.Expressions;
using ILspect.Syntax.Statements;

namespace ILspect.Syntax
{
    public class SyntaxGraphNode
    {
        private List<Statement> _statements;
        private List<SyntaxGraphLink> _outboundLinks = new List<SyntaxGraphLink>();

        public int Offset { get; }
        public string DisplayName => $"IL_{Offset:X4}";
        public IReadOnlyCollection<Statement> Statements => _statements;
        public IReadOnlyList<SyntaxGraphLink> OutboundLinks => _outboundLinks.AsReadOnly();

        public SyntaxGraphNode(int offset)
            : this(offset, Enumerable.Empty<Statement>()) { }

        public SyntaxGraphNode(int offset, params Statement[] statements)
            : this(offset, (IEnumerable<Statement>)statements) { }

        public SyntaxGraphNode(int offset, IEnumerable<Statement> statements)
        {
            Offset = offset;
            _statements = statements.ToList();
        }

        internal void AddStatement(Statement statement) => _statements.Add(statement);

        internal void AddLink(Expression expression, SyntaxGraphNode target)
        {
            _outboundLinks.Add(new SyntaxGraphLink(expression, target));
        }
    }
}