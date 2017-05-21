using System.Collections.Generic;

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
    }
}