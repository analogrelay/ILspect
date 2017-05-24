using System.Collections.Generic;
using System.Linq;

namespace ILspect.Syntax
{
    public class SyntaxGraph
    {
        private readonly SortedDictionary<int, SyntaxGraphNode> _nodes;
        private readonly MethodVariables _variables;

        public IReadOnlyCollection<SyntaxGraphNode> Nodes => _nodes.Values;

        public SyntaxGraph(SortedDictionary<int, SyntaxGraphNode> nodes, MethodVariables variables)
        {
            _nodes = nodes;
            _variables = variables;
        }

        public static SyntaxGraph Create(params SyntaxGraphNode[] nodes)
            => Create(new MethodVariables(), nodes);

        public static SyntaxGraph Create(MethodVariables variables, params SyntaxGraphNode[] nodes)
            => Create(variables, (IEnumerable<SyntaxGraphNode>)nodes);

        public static SyntaxGraph Create(MethodVariables variables, IEnumerable<SyntaxGraphNode> nodes)
        {
            return new SyntaxGraph(
                new SortedDictionary<int, SyntaxGraphNode>(nodes.ToDictionary(n => n.Offset)),
                variables);
        }
    }
}