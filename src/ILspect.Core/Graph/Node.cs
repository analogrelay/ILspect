using System.Collections.Generic;

namespace ILspect.Graph
{
    public class Node<TPayload, TEdge>
    {
        public string Name { get; }
        public TPayload Payload { get; }
        public IList<TEdge> Edges { get; } = new List<TEdge>();

        public Node(string name, TPayload payload)
        {
            Name = name;
            Payload = payload;
        }
    }
}