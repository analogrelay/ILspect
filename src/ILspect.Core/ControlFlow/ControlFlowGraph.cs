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

            var nodes = new List<ControlFlowNode>();

            var counter = 0;
            var root = new ControlFlowNode($"bb{counter}");
            nodes.Add(root);
            counter += 1;

            var current = root;

            var instruction = body.Instructions.First();
            foreach (var instruction in body.Instructions)
            {
                if (instruction.OpCode == OpCodes.Br_S || instruction.OpCode == OpCodes.Br)
                {
                    var target = (Instruction)instruction.Operand;
                    var next = new ControlFlowNode($"bb{counter}");
                    nodes.Add(next);
                    counter += 1;

                    // This is unconditional, so there's no split
                    current.Links.Add(new ControlFlowLink(BranchCondition.Unconditional, next));
                    current = next;
                }
                else if (instruction.OpCode == OpCodes.Brfalse_S || instruction.OpCode == OpCodes.Brfalse)
                {
                    var target = (Instruction)instruction.Operand;
                    var next = new ControlFlowNode($"bb{counter}");
                    nodes.Add(next);
                    counter += 1;

                    current.Links.Add(new ControlFlowLink(BranchCondition.False, next));
                    current = next;
                }
                else
                {
                    current.Instructions.Add(instruction);
                }
            }

            return new ControlFlowGraph(root, nodes);
        }
    }
}