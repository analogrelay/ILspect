namespace ILspect.ControlFlow
{
    public class ControlFlowLink
    {
        // TODO: Condition
        public BranchCondition Condition { get; }
        public ControlFlowNode Destination { get; }

        public ControlFlowLink(BranchCondition condition, ControlFlowNode destination)
        {
            Destination = destination;
        }
    }
}