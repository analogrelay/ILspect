using System;
using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.ControlFlow
{
    public class ControlFlowGraph : Graph<Instruction, Condition>
    {
        public ControlFlowGraph(Node root, IDictionary<int, Node> nodes) : base(root, nodes)
        {
        }

        public static ControlFlowGraph Create(MethodDefinition method)
        {
            var workQueue = new Queue<Node>();
            var nodes = new SortedList<int, Node>();

            if (!method.HasBody)
            {
                return new ControlFlowGraph(null, nodes);
            }

            Node GetOrAddNode(Instruction instr)
            {
                if (nodes.TryGetValue(instr.Offset, out var node))
                {
                    return node;
                }

                node = new Node(instr.Offset);
                node.Contents.Add(instr);
                nodes.Add(instr.Offset, node);
                return node;
            }

            // Create the start node
            var root = GetOrAddNode(method.Body.Instructions.First());

            foreach (var instruction in method.Body.Instructions)
            {
                var node = GetOrAddNode(instruction);

                switch (instruction.OpCode.FlowControl)
                {
                    case FlowControl.Branch:
                        node.Contents.Clear(); // Branches are moved to edges
                        node.AddEdge(null, GetOrAddNode((Instruction)instruction.Operand));
                        break;
                    case FlowControl.Cond_Branch:
                        node.Contents.Clear(); // Branches are moved to edges
                        node.AddEdge(null, GetOrAddNode(instruction.Next));
                        node.AddEdge(new BranchCondition<Instruction>(instruction), GetOrAddNode((Instruction)instruction.Operand));
                        break;
                    case FlowControl.Next:
                    case FlowControl.Call:
                        node.AddEdge(null, GetOrAddNode(instruction.Next));
                        break;
                    case FlowControl.Return:
                        if (instruction.OpCode == OpCodes.Endfilter)
                        {
                            // Endfilter is actually not a return
                            node.AddEdge(null, GetOrAddNode(instruction.Next));
                        }
                        else
                        {
                            node.Contents.Clear(); // Returns are moved to edges
                        }
                        break;
                    default:
                        throw new InvalidOperationException($"Unsupported flow control type: {instruction.OpCode} -> {instruction.OpCode.FlowControl}");
                }
            }

            // Wire up exception handlers
            foreach (var handler in method.Body.ExceptionHandlers)
            {
                // Figure out the condition for this block
                var condition = CreateCondition(handler);
                var handlerNode = GetOrAddNode(handler.FilterStart == null ? handler.HandlerStart : handler.FilterStart);

                if (handler.FilterStart != null)
                {
                    handlerNode.Type = NodeType.Filter;
                }

                // Each node within the try block jumps to the handler block if there's an exception
                var inst = handler.TryStart;
                while (inst != handler.TryEnd)
                {
                    var node = GetOrAddNode(inst);
                    node.AddEdge(condition, handlerNode);
                    inst = inst.Next;
                }
            }

            // Merge nodes
            nodes = CollapseNodes(nodes);

            return new ControlFlowGraph(root, nodes);
        }

        private static SortedList<int, Node> CollapseNodes(SortedList<int, Node> nodes)
        {
            // This thing is probably terribly slow
            var output = new SortedList<int, Node>();
            var node = nodes.Values.FirstOrDefault();
            while (node != null)
            {
                // Try to merge this node
                var merged = false;

                // Remove links to empty nodes, just copy their outbound edges up
                var removableEdges = node.OutboundEdges.Where(e => e.Target.Contents.Count == 0).ToList();
                foreach (var removableEdge in removableEdges)
                {
                    node.Inline(removableEdge);
                }

                var unconditionalEdge = node.OutboundEdges.SingleOrDefault(e => e.Value == null);
                if (unconditionalEdge != null)
                {
                    var target = unconditionalEdge.Target;
                    if (target.InboundEdges.Count == 1 && target.InboundEdges[0].Source == node)
                    {
                        // Check the other edges, if any
                        var sourceOutbounds = node.OutboundEdges.Where(e => e.Value != null);
                        if (sourceOutbounds.All(s => target.OutboundEdges.Any(t => Equals(t.Target, s.Target) && Equals(s.Value, t.Value))))
                        {
                            // Remove the other node and merge it in
                            target.Detach();
                            nodes.Remove(target.Offset);
                            node.MergeIn(target);
                            merged = true;
                        }
                    }
                }

                if (!merged)
                {
                    // Finished with this node, move to the next one
                    output.Add(node.Offset, node);
                    nodes.Remove(node.Offset);

                    node = nodes.Values.FirstOrDefault();
                }
            }

            var unreachableNodes = output.Values.Where(n => n.Offset != 0 && n.InboundEdges.Count == 0).ToList();
            foreach (var unreachableNode in unreachableNodes)
            {
                unreachableNode.Detach();
                output.Remove(unreachableNode.Offset);
            }

            return output;
        }

        private static Condition CreateCondition(ExceptionHandler handler)
        {
            switch (handler.HandlerType)
            {
                case ExceptionHandlerType.Catch: return new CatchCondition(handler.CatchType);
                case ExceptionHandlerType.Filter: return new FilterCondtion();
                case ExceptionHandlerType.Finally: return new FinallyCondition();
                case ExceptionHandlerType.Fault: return new FaultCondition();
                default: throw new InvalidOperationException($"Unknown exception handler type: {handler.HandlerType}");
            }
        }
    }
}