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

            var stack = new Stack<ControlFlowNode>();
            var instruction = body.Instructions.First();
            var root = new ControlFlowNode(GetNodeName(instruction.Offset));
            root.Instructions.Add(instruction);
            stack.Push(root);



            while (stack.Empt)
            {
                nodes[node.Name] = node;
                node.Instructions.Add(instruction);

                if (root == null)
                {
                    root = node;
                }

                if (instruction.OpCode == OpCodes.Br || instruction.OpCode == OpCodes.Br_S)
                {
                    var nextName = GetNodeName(((Instruction)instruction.Operand).Offset);
                    node.Links.Add(new ControlFlowLink(BranchCondition.Unconditional, nextName));
                }
                else if (instruction.OpCode == OpCodes.Brfalse || instruction.OpCode == OpCodes.Brfalse_S)
                {
                    var falseTarget = GetNodeName(((Instruction)instruction.Operand).Offset);
                    node.Links.Add(new ControlFlowLink(BranchCondition.False, falseTarget));
                    var trueTarget = instruction.Next == null ? "end" : GetNodeName(instruction.Next.Offset);
                    node.Links.Add(new ControlFlowLink(BranchCondition.True, trueTarget));
                }
                else if (instruction.OpCode == OpCodes.Brtrue || instruction.OpCode == OpCodes.Brtrue_S)
                {
                    var trueTarget = GetNodeName(((Instruction)instruction.Operand).Offset);
                    node.Links.Add(new ControlFlowLink(BranchCondition.True, trueTarget));
                    var falseTarget = instruction.Next == null ? "end" : GetNodeName(instruction.Next.Offset);
                    node.Links.Add(new ControlFlowLink(BranchCondition.False, falseTarget));
                }
                else
                {
                    var nextName = instruction.Next == null ? "end" : GetNodeName(instruction.Next.Offset);
                    node.Links.Add(new ControlFlowLink(BranchCondition.Unconditional, nextName));
                }

                instruction = instruction.Next;
            }

            return new ControlFlowGraph(root, nodes.Values);
        }

        private static string GetNodeName(int offset)
        {
            return $"IL_{offset:X4}";
        }
    }
}