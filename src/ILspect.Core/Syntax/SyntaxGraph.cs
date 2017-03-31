using System.Collections.Generic;
using System.Linq;

namespace ILspect.Syntax
{
    public class SyntaxGraph
    {
        public Node Root { get; }
        public IDictionary<string, Node> Nodes { get; }

        public SyntaxGraph(Node root, IDictionary<string, Node> nodes)
        {
            Root = root;
            Nodes = nodes;
        }

        public class Node : ILspect.Graph.Node<Statement, Edge>
        {
            public Node(string name) : base(name)
            {
            }
        }

        public class Edge : ILspect.Graph.Edge<Expression>
        {
            public Edge(Expression payload, string source, string target) : base(payload, source, target)
            {
            }
        }
    }
}