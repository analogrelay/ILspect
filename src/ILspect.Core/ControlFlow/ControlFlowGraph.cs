using System.Collections.Generic;
using Mono.Cecil.Cil;

namespace ILspect.ControlFlow
{
    public class ControlFlowGraph
    {
        private readonly SortedDictionary<int, ControlFlowNode> _nodes;
        private readonly List<ExceptionHandler> _exceptionHandlers;

        public IReadOnlyCollection<ControlFlowNode> Nodes => _nodes.Values;
        public IReadOnlyCollection<ExceptionHandler> ExceptionHandlers => _exceptionHandlers.AsReadOnly();

        internal ControlFlowGraph(SortedDictionary<int, ControlFlowNode> nodes, List<ExceptionHandler> exceptionHandlers)
        {
            _nodes = nodes;
            _exceptionHandlers = exceptionHandlers;
        }
    }
}