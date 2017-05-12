using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Mono.Cecil.Cil;

namespace ILspect.ControlFlow
{
    public class ControlFlowGraphBuilder
    {
        public static ControlFlowGraph Build(MethodBody method)
        {
            var spans = new SortedDictionary<int, InstructionSpan>();

            IEnumerable<Instruction> EnumerateInstructions(Instruction start)
            {
                var current = start;
                while (current != null)
                {
                    yield return current;
                    current = current.Next;
                }
            }

            void FindEndPoints()
            {
                // Enumerate each block until we find an instruction where there is already a block
                foreach (var block in spans)
                {
                    foreach (var instruction in EnumerateInstructions(block.Value.First).Skip(1))
                    {
                        // If a block exists at this offset...
                        if (spans.ContainsKey(instruction.Offset))
                        {
                            // ... then previous instruction is the end of this block
                            block.Value.Last = instruction.Previous;
                            break;
                        }
                    }
                }
            }

            void MarkStartPoint(Instruction instruction)
            {
                if (!spans.ContainsKey(instruction.Offset))
                {
                    spans.Add(instruction.Offset, new InstructionSpan(instruction));
                }
            }

            void ScanBranches()
            {
                foreach (var instruction in method.Instructions)
                {
                    if (instruction.OpCode.FlowControl == FlowControl.Branch || instruction.OpCode.FlowControl == FlowControl.Cond_Branch)
                    {
                        // Both sides of the branch are start points
                        MarkStartPoint(instruction.Next);
                        MarkStartPoint((Instruction)instruction.Operand);
                    }
                }
            }

            void ScanExceptionHandlers()
            {
                foreach (var handler in method.ExceptionHandlers)
                {
                    MarkStartPoint(handler.TryStart);
                    MarkStartPoint(handler.HandlerStart);
                    if (handler.FilterStart != null)
                    {
                        MarkStartPoint(handler.FilterStart);
                    }
                }
            }

            // The start instruction is, obviously, the start of a block
            MarkStartPoint(method.Instructions[0]);

            // Scan branch instructions for block starts
            ScanBranches();

            // Scan exception handlers for block starts
            ScanExceptionHandlers();

            // Walk each block to find the end point
            FindEndPoints();

            // Build flow graph nodes
            var nodes = BuildGraphNodes(spans);

            // Check invariants
            Debug.Assert(nodes.Take(nodes.Count - 1).All(n => n.Value.OutboundLinks.Count > 0), "Expected all but the last node to have outbound links");
            Debug.Assert(nodes.All(n =>
                n.Value.OutboundLinks.Count == 0 ||
                (n.Value.OutboundLinks.Count == 1 && n.Value.OutboundLinks[0].Condition == Condition.Unconditional) ||
                (n.Value.OutboundLinks.Count == 2 && n.Value.OutboundLinks[0].Condition == Condition.Conditional && n.Value.OutboundLinks[1].Condition == Condition.Unconditional)),
                "Expected links to be ordered with Conditional arm first");

            return new ControlFlowGraph(nodes, method.ExceptionHandlers.ToList());
        }

        private static SortedDictionary<int, ControlFlowNode> BuildGraphNodes(SortedDictionary<int, InstructionSpan> spans)
        {
            var nodes = new SortedDictionary<int, ControlFlowNode>();

            // Populate the list
            foreach (var span in spans.Values)
            {
                nodes.Add(span.First.Offset, new ControlFlowNode(span));
            }

            // Determine links
            foreach (var node in nodes.Values)
            {
                LinkNode(node, nodes);
            }

            return nodes;
        }

        private static void LinkNode(ControlFlowNode node, SortedDictionary<int, ControlFlowNode> nodes)
        {
            void LinkToNext()
            {
                // Link to the next block, if any
                if (node.Instructions.Last.Next != null)
                {
                    Debug.Assert(nodes.ContainsKey(node.Instructions.Last.Next.Offset), "Expected there to be a control flow block for the next node!");
                    node.AddLink(Condition.Unconditional, nodes[node.Instructions.Last.Next.Offset]);
                }
            }

            if (node.Instructions.Last == null)
            {
                // No links to make
                return;
            }

            // Check the last instruction in the node
            int nextOffset;
            switch (node.Instructions.Last.OpCode.FlowControl)
            {
                case FlowControl.Branch:
                    // Link to the target node, unconditionally
                    nextOffset = ((Instruction)node.Instructions.Last.Operand).Offset;
                    Debug.Assert(nodes.ContainsKey(nextOffset), "Expected there to be a control flow block for the next node!");
                    node.AddLink(Condition.Unconditional, nodes[nextOffset]);
                    break;
                case FlowControl.Cond_Branch:
                    // Link to the target node, conditionally
                    nextOffset = ((Instruction)node.Instructions.Last.Operand).Offset;
                    Debug.Assert(nodes.ContainsKey(nextOffset), "Expected there to be a control flow block for the next node!");
                    node.AddLink(Condition.Conditional, nodes[nextOffset]);

                    // Also link to the next block unconditionally
                    LinkToNext();
                    break;
                default:
                    // Just link to the next block unconditionally
                    LinkToNext();
                    break;
            }
        }

        //private static Condition GetCondition(OpCode opCode)
        //{
        //    if (opCode == OpCodes.Brfalse || opCode == OpCodes.Brfalse_S)
        //    {
        //        return Condition.False;
        //    }
        //    else if (opCode == OpCodes.Brtrue || opCode == OpCodes.Brtrue_S)
        //    {
        //        return Condition.True;
        //    }
        //    else if (opCode == OpCodes.Beq || opCode == OpCodes.Beq_S)
        //    {
        //        return Condition.Equal;
        //    }
        //    else if (opCode == OpCodes.Bne_Un || opCode == OpCodes.Bne_Un_S)
        //    {
        //        return Condition.NotEqual;
        //    }
        //    else if (opCode == OpCodes.Bge || opCode == OpCodes.Bge_S ||
        //            opCode == OpCodes.Bge_Un || opCode == OpCodes.Bge_Un_S)
        //    {
        //        return Condition.GreaterThanOrEqual;
        //    }
        //    else if (opCode == OpCodes.Bgt || opCode == OpCodes.Bgt_S ||
        //            opCode == OpCodes.Bgt_Un || opCode == OpCodes.Bgt_Un_S)
        //    {
        //        return Condition.GreaterThan;
        //    }
        //    else if (opCode == OpCodes.Ble || opCode == OpCodes.Ble_S ||
        //            opCode == OpCodes.Ble_Un || opCode == OpCodes.Ble_Un_S)
        //    {
        //        return Condition.LessThanOrEqual;
        //    }
        //    else if (opCode == OpCodes.Blt || opCode == OpCodes.Blt_S ||
        //            opCode == OpCodes.Blt_Un || opCode == OpCodes.Blt_Un_S)
        //    {
        //        return Condition.LessThan;
        //    }
        //    else
        //    {
        //        throw new InvalidOperationException($"Unrecognized Branch instruction: {opCode}");
        //    }
        //}
    }
}
