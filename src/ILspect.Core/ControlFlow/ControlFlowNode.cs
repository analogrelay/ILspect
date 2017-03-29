using System.Collections.Generic;
using System.Text;
using Mono.Cecil.Cil;

namespace ILspect.ControlFlow
{
    public class ControlFlowNode
    {
        public string Name { get; }
        public IList<Instruction> Instructions { get; } = new List<Instruction>();
        public IList<ControlFlowLink> Links { get; } = new List<ControlFlowLink>();

        public ControlFlowNode(string name)
        {
            Name = name;
        }
    }
}