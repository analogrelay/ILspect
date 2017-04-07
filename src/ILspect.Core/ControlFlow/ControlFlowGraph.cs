using System;
using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.ControlFlow
{
    public class ControlFlowGraph
    {
        public Node Root { get; }

        public IDictionary<string, Node> Nodes { get; }

        public ControlFlowGraph(Node root, IDictionary<string, Node> nodes)
        {
            Root = root;
            Nodes = nodes;
        }

        public static ControlFlowGraph Create(MethodDefinition method)
        {
            var body = method.Body;

            var nodes = new Dictionary<string, Node>();

            var workQueue = new Queue<Node>();

            // Create the root node and put it in the queue
            var instruction = method.Body.Instructions.FirstOrDefault();
            var root = new Node(GetNodeName(0));
            nodes[root.Name] = root;
            if (instruction != null)
            {
                root.Payload.Add(instruction);
            }
            workQueue.Enqueue(root);

            while (workQueue.Count > 0)
            {
                var current = workQueue.Dequeue();
                instruction = current.Payload.LastOrDefault()?.Next;
                while (instruction != null)
                {
                    if (instruction.OpCode == OpCodes.Br || instruction.OpCode == OpCodes.Br_S)
                    {
                        var target = (Instruction)instruction.Operand;
                        var nextName = GetNodeName(target.Offset);
                        if (!nodes.TryGetValue(nextName, out var nextNode))
                        {
                            nextNode = new Node(nextName);
                            if (instruction.Next != null)
                            {
                                nextNode.Payload.Add(instruction.Next);
                            }
                            nodes[nextNode.Name] = nextNode;
                            workQueue.Enqueue(nextNode);
                        }
                        current.OutboundEdges.Add(new Edge(instruction, current.Name, nextNode.Name));
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
                        current.Payload.Add(instruction);
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


            return new ControlFlowGraph(root, nodes);
        }

        private static void CreateBranch(Dictionary<string, Node> nodes, Queue<Node> workQueue, Node current, Instruction instruction)
        {
            var branchTarget = (Instruction)instruction.Operand;

            var branchName = GetNodeName(branchTarget.Offset);
            if (!nodes.TryGetValue(branchName, out var branchNode))
            {
                branchNode = new Node(branchName);
                branchNode.Payload.Add(branchTarget);
                nodes[branchNode.Name] = branchNode;
                workQueue.Enqueue(branchNode);
            }
            current.OutboundEdges.Add(new Edge(instruction, current.Name, branchNode.Name));

            if (instruction.Next != null)
            {
                var nextName = GetNodeName(instruction.Next.Offset);
                if (!nodes.TryGetValue(nextName, out var nextNode))
                {
                    nextNode = new Node(nextName);
                    nextNode.Payload.Add(instruction.Next);
                    nodes[nextNode.Name] = nextNode;
                    workQueue.Enqueue(nextNode);
                }
                current.OutboundEdges.Add(new Edge(null, current.Name, nextNode.Name));
            }
        }

        private static string GetNodeName(int offset)
        {
            return $"IL_{offset:X4}";
        }

        public class Node : ILspect.Graph.Node<Instruction, Edge>
        {
            public Node(string name) : base(name) { }
        }

        public class Edge : ILspect.Graph.Edge<Instruction>
        {
            public Edge(Instruction payload, string source, string target) : base(payload, source, target) { }
        }
    }
}