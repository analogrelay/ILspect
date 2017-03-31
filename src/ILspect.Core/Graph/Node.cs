using System.Collections.Generic;

namespace ILspect.Graph
{
    public class Node<TPayload, TEdge>
    {
        public string Name { get; }
        public IList<TPayload> Payload { get; } = new List<TPayload>();
        public IList<TEdge> Edges { get; } = new List<TEdge>();

        public Node(string name)
        {
            Name = name;
        }
    }
}