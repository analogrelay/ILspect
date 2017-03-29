using Mono.Cecil;

namespace ILspect.ControlFlow
{
    public class ControlFlowGraph
    {
        public ControlFlowNode Root { get; }

        public ControlFlowGraph(ControlFlowNode root)
        {
            Root = root;
        }

        public static ControlFlowGraph Create(MethodDefinition method)
        {
            var body = method.Body;
            var root = new ControlFlowNode("bb0");

            foreach (var instruction in body.Instructions)
            {
                root.Instructions.Add(instruction);
                // TODO: Y'know, actual analysis ;)
            }

            return new ControlFlowGraph(root);
        }
    }
}