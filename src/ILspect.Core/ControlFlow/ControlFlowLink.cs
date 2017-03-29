namespace ILspect.ControlFlow
{
    public class ControlFlowLink
    {
        // TODO: Condition
        public BranchCondition Condition { get; }
        public string Destination { get; }

        public ControlFlowLink(BranchCondition condition, string destination)
        {
            Condition = condition;
            Destination = destination;
        }
    }
}