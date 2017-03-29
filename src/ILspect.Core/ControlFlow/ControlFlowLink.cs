using Mono.Cecil.Cil;

namespace ILspect.ControlFlow
{
    public class ControlFlowLink
    {
        // TODO: Condition
        public Instruction Branch { get; }
        public ControlFlowNode Destination { get; }

        public ControlFlowLink(Instruction branch, ControlFlowNode destination)
        {
            Branch = branch;
            Destination = destination;
        }
    }
}