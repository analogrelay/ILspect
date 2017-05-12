namespace ILspect.ControlFlow
{
    public class ControlFlowLink
    {
        public ControlFlowNode Target { get; }
        public Condition Condition { get; }

        public ControlFlowLink(Condition condition, ControlFlowNode target)
        {
            Condition = condition;
            Target = target;
        }
    }
}