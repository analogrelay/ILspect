using System;
using System.Collections.Generic;
using System.Linq;

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

        public override string ToString()
        {
            return $"{DisplayName} : {{" + Environment.NewLine +
                string.Join(Environment.NewLine, Instructions.Select(i => $"  {i.ToString()}")) + Environment.NewLine +
                $"}}{FormatLinks()}";
        }

        private string FormatLinks()
        {
            if (OutboundLinks.Count == 0)
            {
                return string.Empty;
            }
            return " " + string.Join("; ", OutboundLinks.Select(FormatLink));
        }

        private static string FormatLink(ControlFlowLink link)
        {
            if (link.Condition == Condition.Conditional)
            {
                return $"true -> {link.Target.DisplayName}";
            }
            else
            {
                return $"else -> {link.Target.DisplayName}";
            }
        }
    }
}