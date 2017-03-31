namespace ILspect.Graph
{
    public class Edge<T>
    {
        public T Payload { get; }
        public string Source { get; }
        public string Target { get; }

        public Edge(T payload, string source, string target)
        {
            Payload = payload;
            Source = source;
            Target = target;
        }
    }
}