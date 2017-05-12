using System.Collections.Generic;

namespace ILspect.Syntax
{
    public class SyntaxGraph
    {
        private readonly SortedDictionary<int, SyntaxTreeNode> _nodes;
        private readonly MethodVariables _variables;

        public IReadOnlyCollection<SyntaxTreeNode> Nodes => _nodes.Values;

        public SyntaxGraph(SortedDictionary<int, SyntaxTreeNode> nodes, MethodVariables variables)
        {
            _nodes = nodes;
            _variables = variables;
        }
    }
}