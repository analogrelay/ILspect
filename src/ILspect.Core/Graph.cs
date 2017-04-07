using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ILspect
{
    public abstract class Graph<TNode, TEdge>
    {
        public Node Root { get; }

        public IDictionary<string, Node> Nodes { get; }

        protected Graph(Node root, IDictionary<string, Node> nodes)
        {
            Root = root;
            Nodes = nodes;
        }

        public class Edge
        {
            public TEdge Value { get; }
            public string Source { get; }
            public string Target { get; }

            public Edge(TEdge value, string source, string target)
            {
                Value = value;
                Source = source;
                Target = target;
            }
        }

        public class Node
        {
            public string Name { get; }
            public IList<TNode> Contents { get; } = new List<TNode>();
            public IList<Edge> InboundEdges { get; } = new List<Edge>();
            public IList<Edge> OutboundEdges { get; } = new List<Edge>();

            public Node(string name)
            {
                Name = name;
            }
        }

        protected static void Weave(IDictionary<string, Node> nodes)
        {
            // Wire up the inbound edges
            foreach(var edge in nodes.Values.SelectMany(n => n.OutboundEdges))
            {
                var target = nodes[edge.Target];
                target.InboundEdges.Add(edge);
            }
        }
    }
}
