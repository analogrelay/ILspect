using System;
using System.Collections.Generic;
using System.Linq;
using ILspect.ControlFlow;
using Mono.Cecil.Cil;

namespace ILspect
{
    public enum NodeType
    {
        Normal,
        Filter
    }

    public abstract class Graph<TNode, TEdge>
    {
        public Node Root { get; }

        public IDictionary<int, Node> Nodes { get; }

        protected Graph(Node root, IDictionary<int, Node> nodes)
        {
            Root = root;
            Nodes = nodes;
        }

        public class Edge
        {
            public TEdge Value { get; }
            public Node Source { get; internal set; }
            public Node Target { get; internal set; }

            public Edge(TEdge value, Node source, Node target)
            {
                Value = value;
                Source = source;
                Target = target;
            }

            public Edge()
            {
            }
        }

        public class Node
        {
            private List<Edge> _outboundEdges = new List<Edge>();
            private List<Edge> _inboundEdges = new List<Edge>();

            public int Offset { get; }
            public NodeType Type { get; set; } = NodeType.Normal;
            public IList<TNode> Contents { get; } = new List<TNode>();
            public IReadOnlyList<Edge> InboundEdges => _inboundEdges.AsReadOnly();
            public IReadOnlyList<Edge> OutboundEdges => _outboundEdges.AsReadOnly();
            public string DisplayName => $"IL_{Offset:X4}";

            public Node(int offset)
            {
                Offset = offset;
            }

            public void AddEdge(TEdge value, Node target)
            {
                AddEdge(_outboundEdges, value, target);
            }

            private void AddEdge(List<Edge> list, TEdge value, Node target)
            {
                var edge = new Edge(value, this, target);
                list.Add(edge);
                if (target != null)
                {
                    target._inboundEdges.Add(edge);
                }
            }

            public void Detach()
            {
                foreach (var inboundEdge in InboundEdges)
                {
                    inboundEdge.Source._outboundEdges.Remove(inboundEdge);
                }

                foreach (var outboundEdge in OutboundEdges)
                {
                    outboundEdge.Target._inboundEdges.Remove(outboundEdge);
                }
            }

            public void MergeIn(Node other)
            {
                foreach (var item in other.Contents)
                {
                    Contents.Add(item);
                }

                other.Detach();

                foreach (var outboundEdge in OutboundEdges)
                {
                    outboundEdge.Target._inboundEdges.Remove(outboundEdge);
                }

                var newEdges = new List<Edge>();
                foreach (var edge in other._outboundEdges)
                {
                    AddEdge(newEdges, edge.Value, edge.Target);
                }

                // Add edges I have but the other node doesn't
                foreach (var edge in _outboundEdges)
                {
                    if (!newEdges.Any(e => Equals(e.Value, edge.Value)))
                    {
                        AddEdge(newEdges, edge.Value, edge.Target);
                    }
                }

                _outboundEdges = newEdges;
            }

            public void Inline(Edge edge)
            {
                _outboundEdges.Remove(edge);
                edge.Target._inboundEdges.Remove(edge);
                foreach (var outboundEdge in edge.Target.OutboundEdges)
                {
                    if (!OutboundEdges.Any(e => Equals(e.Value, outboundEdge.Value)))
                    {
                        AddEdge(outboundEdge.Value, outboundEdge.Target);
                    }
                }
            }
        }
    }
}
