using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.ControlFlow
{
    public class ControlFlowGraph : Graph<Instruction, Instruction>
    {
        public ControlFlowGraph(Node root, IDictionary<string, Node> nodes) : base(root, nodes)
        {
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
                root.Contents.Add(instruction);
            }
            workQueue.Enqueue(root);

            // Preload all branch targets into the graph
            // This is probably not the idea way to do this, but it should work
            foreach (var instr in method.Body.Instructions)
            {
                if (instr.OpCode.FlowControl == FlowControl.Branch || instr.OpCode.FlowControl == FlowControl.Cond_Branch)
                {
                    var target = (Instruction)instr.Operand;
                    var name = GetNodeName(target.Offset);
                    if (!nodes.TryGetValue(name, out _))
                    {
                        var node = new Node(name);
                        nodes[name] = node;
                        node.Contents.Add(target);
                        workQueue.Enqueue(node);
                    }
                }
            }

            while (workQueue.Count > 0)
            {
                var current = workQueue.Dequeue();
                instruction = current.Contents.LastOrDefault()?.Next;
                while (instruction != null)
                {
                    // If there is a node for this instruction already, flow to that and stop
                    if (nodes.TryGetValue(GetNodeName(instruction.Offset), out var node))
                    {
                        var nextName = node.Name;
                        current.OutboundEdges.Add(new Edge(null, current.Name, nextName));
                        instruction = null;
                    }
                    else if (instruction.OpCode.FlowControl == FlowControl.Branch)
                    {
                        var target = (Instruction)instruction.Operand;
                        var nextName = GetNodeName(target.Offset);
                        if (!nodes.TryGetValue(nextName, out var nextNode))
                        {
                            nextNode = new Node(nextName);
                            nextNode.Contents.Add(target);
                            nodes[nextNode.Name] = nextNode;
                            workQueue.Enqueue(nextNode);
                        }
                        current.OutboundEdges.Add(new Edge(instruction, current.Name, nextNode.Name));
                        instruction = null;
                    }
                    else if (instruction.OpCode.FlowControl == FlowControl.Cond_Branch)
                    {
                        CreateBranch(nodes, workQueue, current, instruction);
                        instruction = null;
                    }
                    else
                    {
                        current.Contents.Add(instruction);
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

            Weave(nodes);

            return new ControlFlowGraph(root, nodes);
        }

        private static void CreateBranch(Dictionary<string, Node> nodes, Queue<Node> workQueue, Node current, Instruction instruction)
        {
            var branchTarget = (Instruction)instruction.Operand;

            var branchName = GetNodeName(branchTarget.Offset);
            if (!nodes.TryGetValue(branchName, out var branchNode))
            {
                branchNode = new Node(branchName);
                branchNode.Contents.Add(branchTarget);
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
                    nextNode.Contents.Add(instruction.Next);
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
    }
}