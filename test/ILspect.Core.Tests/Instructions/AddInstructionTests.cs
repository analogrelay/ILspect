using System;
using Xunit;
using ILspect.Syntax.Expressions;
using Mono.Cecil;
using ILspect.Syntax;
using Mono.Cecil.Cil;
using System.Collections.Generic;
using ILspect.ControlFlow;
using System.Linq;
using ILspect.Syntax.Statements;

namespace ILspect.Core.Tests.Instructions
{
    public class AddInstructionTests
    {
        private static readonly InstructionSpan Instructions = InstructionTester.BuildSpan(
            Instruction.Create(OpCodes.Ldc_I4_4),
            Instruction.Create(OpCodes.Ldc_I4_2),
            Instruction.Create(OpCodes.Add)
        );

        [Fact]
        public void ControlFlow()
        {
            var graph = ControlFlowGraph.Create(
                new ControlFlowNode(Instructions)
            );
            InstructionTester.RunControlFlowTest(Instructions, graph);
        }

        [Fact]
        public void Syntax()
        {
            var graph = SyntaxGraph.Create(
                new SyntaxGraphNode(0,
                    new DiscardStatement(
                        new BinaryExpression(
                            new ConstantExpression(0, MetadataType.Int32, instruction: null),
                            new ConstantExpression(1, MetadataType.Int32, instruction: null),
                            BinaryOperator.Add,
                            withOverflowDetection: false,
                            unsigned: false
                        ))));
            InstructionTester.RunExpressionTest(Instruction, graph);
        }
    }
}
