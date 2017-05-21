using System;
using System.Collections.Generic;
using System.Linq;
using ILspect.ControlFlow;
using Mono.Cecil.Cil;
using Xunit;

namespace ILspect.Core.Tests.Instructions
{
    public static class InstructionTester
    {
        public static void RunControlFlowTest(InstructionSpan instructions, ControlFlowGraph expectedGraph)
        {
            var actualGraph = ControlFlowGraphBuilder.Build(instructions.ToList(), Array.Empty<ExceptionHandler>());
            Assert.Equal(expectedGraph, actualGraph, TestControlFlowGraphComparer.Instance);
        }

        public static InstructionSpan BuildSpan(params Instruction[] instructions) =>
            BuildSpan(startOffset: 0, instructions: instructions);

        public static InstructionSpan BuildSpan(int startOffset, params Instruction[] instructions)
        {
            // Stich the list together
            Instruction previous = null;
            var offset = startOffset;
            foreach (var instruction in instructions)
            {
                instruction.Offset = offset;
                instruction.Previous = previous;

                if (previous != null)
                {
                    previous.Next = instruction;
                }

                previous = instruction;
                offset += instruction.GetSize();
            }

            // Create the span
            return new InstructionSpan(instructions.FirstOrDefault());
        }

        private class TestControlFlowGraphComparer : IEqualityComparer<ControlFlowGraph>
        {
            public static readonly TestControlFlowGraphComparer Instance = new TestControlFlowGraphComparer();

            private TestControlFlowGraphComparer() { }

            public bool Equals(ControlFlowGraph x, ControlFlowGraph y)
            {
                return Enumerable.SequenceEqual(x.Nodes, y.Nodes, TestControlFlowNodeComparer.Instance);
            }

            public int GetHashCode(ControlFlowGraph obj)
            {
                return obj.GetHashCode();
            }
        }

        private class TestControlFlowNodeComparer : IEqualityComparer<ControlFlowNode>
        {
            public static readonly TestControlFlowNodeComparer Instance = new TestControlFlowNodeComparer();

            private TestControlFlowNodeComparer() { }

            public bool Equals(ControlFlowNode x, ControlFlowNode y)
            {
                return Enumerable.SequenceEqual(x.Instructions, y.Instructions, TestInstructionComparer.Instance) &&
                    Enumerable.SequenceEqual(x.OutboundLinks, y.OutboundLinks, TestControlFlowLinkComparer.Instance);
            }

            public int GetHashCode(ControlFlowNode obj)
            {
                return obj.GetHashCode();
            }
        }

        private class TestControlFlowLinkComparer : IEqualityComparer<ControlFlowLink>
        {
            public static readonly TestControlFlowLinkComparer Instance = new TestControlFlowLinkComparer();

            private TestControlFlowLinkComparer() { }

            public bool Equals(ControlFlowLink x, ControlFlowLink y)
            {
                return x.Condition == y.Condition &&
                    // We don't need to check the whole other node,
                    // just that we're both pointing to the same node
                    x.Target.Offset == y.Target.Offset;
            }

            public int GetHashCode(ControlFlowLink obj)
            {
                return obj.GetHashCode();
            }
        }

        private class TestInstructionComparer : IEqualityComparer<Instruction>
        {
            public static readonly TestInstructionComparer Instance = new TestInstructionComparer();

            private TestInstructionComparer() { }

            public bool Equals(Instruction x, Instruction y)
            {
                return x.Offset == y.Offset &&
                    Equals(x.OpCode, y.OpCode) &&
                    Equals(x.Operand, y.Operand);
            }

            public int GetHashCode(Instruction obj)
            {
                return obj.GetHashCode();
            }
        }
    }
}