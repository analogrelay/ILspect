using System;
using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.ControlFlow
{
    public class ControlFlowGraph
    {
        public ControlFlowNode Root { get; }

        public IList<ControlFlowNode> AllNodes { get; }

        public ControlFlowGraph(ControlFlowNode root, IEnumerable<ControlFlowNode> allNodes)
        {
            Root = root;
            AllNodes = allNodes.ToList();
        }

        public static ControlFlowGraph Create(MethodDefinition method)
        {
            var body = method.Body;

            var nodes = new Dictionary<string, ControlFlowNode>();

            var workQueue = new Queue<ControlFlowNode>();

            // Create the root node and put it in the queue
            var instruction = method.Body.Instructions.FirstOrDefault();
            var root = new ControlFlowNode(GetNodeName(0));
            nodes[root.Name] = root;
            if (instruction != null)
            {
                root.Instructions.Add(instruction);
            }
            workQueue.Enqueue(root);

            while (workQueue.Count > 0)
            {
                var current = workQueue.Dequeue();
                instruction = current.Instructions.LastOrDefault()?.Next;
                while (instruction != null)
                {
                    if (instruction.OpCode == OpCodes.Br || instruction.OpCode == OpCodes.Br_S)
                    {
                        var target = (Instruction)instruction.Operand;
                        var nextName = GetNodeName(target.Offset);
                        if (!nodes.TryGetValue(nextName, out var nextNode))
                        {
                            nextNode = new ControlFlowNode(nextName);
                            if (instruction.Next != null)
                            {
                                nextNode.Instructions.Add(instruction.Next);
                            }
                            nodes[nextNode.Name] = nextNode;
                            workQueue.Enqueue(nextNode);
                        }
                        current.Links.Add(new ControlFlowLink(instruction, nextNode));
                        instruction = null;
                    }
                    else if (instruction.OpCode == OpCodes.Brfalse || instruction.OpCode == OpCodes.Brfalse_S ||
                             instruction.OpCode == OpCodes.Brtrue || instruction.OpCode == OpCodes.Brtrue_S)
                    {
                        CreateBranch(nodes, workQueue, current, instruction);
                        instruction = null;
                    }
                    else
                    {
                        current.Instructions.Add(instruction);
                        if (instruction.OpCode != OpCodes.Ret)
                        {
                            instruction = instruction.Next;
                        }
                        else
                        {
                            instruction = null;
                        }
                    }
                }
            }


            return new ControlFlowGraph(root, nodes.Values);
        }

        private static void CreateBranch(Dictionary<string, ControlFlowNode> nodes, Queue<ControlFlowNode> workQueue, ControlFlowNode current, Instruction instruction)
        {
            var branchTarget = (Instruction)instruction.Operand;

            var branchName = GetNodeName(branchTarget.Offset);
            if (!nodes.TryGetValue(branchName, out var branchNode))
            {
                branchNode = new ControlFlowNode(branchName);
                branchNode.Instructions.Add(branchTarget);
                nodes[branchNode.Name] = branchNode;
                workQueue.Enqueue(branchNode);
            }
            current.Links.Add(new ControlFlowLink(instruction, branchNode));

            if (instruction.Next != null)
            {
                var nextName = GetNodeName(instruction.Next.Offset);
                if (!nodes.TryGetValue(nextName, out var nextNode))
                {
                    nextNode = new ControlFlowNode(nextName);
                    nextNode.Instructions.Add(instruction.Next);
                    nodes[nextNode.Name] = nextNode;
                    workQueue.Enqueue(nextNode);
                }
                current.Links.Add(new ControlFlowLink(null, nextNode));
            }
        }

        private static string GetNodeName(int offset)
        {
            return $"IL_{offset:X4}";
        }
    }
}