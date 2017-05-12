using System.Collections.Generic;

namespace ILspect.ControlFlow
{
    public class ControlFlowNode
    {
        private List<ControlFlowLink> _outboundLinks = new List<ControlFlowLink>();

        public InstructionSpan Instructions { get; }
        public IReadOnlyList<ControlFlowLink> OutboundLinks => _outboundLinks.AsReadOnly();

        public int Offset => Instructions.First.Offset;
        public string DisplayName => $"IL_{Offset:X4}";

        public ControlFlowNode(InstructionSpan instructions)
        {
            Instructions = instructions;
        }

        internal void AddLink(Condition condition, ControlFlowNode target)
        {
            _outboundLinks.Add(new ControlFlowLink(condition, target));
        }
    }
}