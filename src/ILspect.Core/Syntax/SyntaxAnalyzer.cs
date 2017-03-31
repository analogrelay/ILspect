using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using ILspect.ControlFlow;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public static class SyntaxAnalyzer
    {
        private static readonly Dictionary<OpCode, Action<MethodDefinition, Stack<Expression>, SyntaxGraph.Node>> _opCodeHandlers = new Dictionary<OpCode, Action<MethodDefinition, Stack<Expression>, SyntaxGraph.Node>>()
        {
            { OpCodes.Nop, null }, // Nop does nothing!
        };

        public static SyntaxGraph AnalyzeSyntax(ControlFlowGraph graph, MethodDefinition method)
        {
            // Set up the nodes of the syntax graph (which will be the same as the input graph, just a different type)
            var nodes = graph.Nodes
                .ToDictionary(n => n.Key, n => new SyntaxGraph.Node(n.Key));

            var evaluationStack = new Stack<Expression>();
            var workQueue = new Queue<ControlFlowGraph.Node>();
            workQueue.Enqueue(graph.Root);

            while (workQueue.Count > 0)
            {
                var current = workQueue.Dequeue();
                var target = nodes[current.Name];

                foreach (var instruction in current.Payload)
                {
                    if (!_opCodeHandlers.TryGetValue(instruction.OpCode, out var handler))
                    {
                        throw new NotSupportedException($"Unsupported opcode: {instruction.OpCode}");
                    }
                    handler?.Invoke(method, evaluationStack, target);
                }

                Debug.Assert(current.Edges.Count < 3, "Control flow graph nodes should never have more than 2 edges");
                Debug.Assert(current.Edges.Where(e => e.Payload != null).Count() < 2, "Control flow graph nodes should never have more than one payload-bearing edge");

                foreach (var edge in current.Edges)
                {
                    Expression expr = null;
                    if (edge.Payload != null)
                    {
                        // Get the expression for this path
                        expr = Pop(evaluationStack);
                    }
                    target.Edges.Add(new SyntaxGraph.Edge(expr, target.Name, edge.Target));

                    var next = graph.Nodes[edge.Target];
                    workQueue.Enqueue(next);
                }

                if (evaluationStack.Count > 0)
                {
                    throw new NotSupportedException("Can't handle evaluation stack being non-empty at the end of a control flow block yet!");
                }
            }

            return new SyntaxGraph(nodes[graph.Root.Name], nodes);
        }

        private static Expression Pop(Stack<Expression> stack)
        {
            if (stack.Count < 1)
            {
                throw new FormatException("Evaluation stack underflow!");
            }
            return stack.Pop();
        }

        // public static IEnumerable<Statement> ParseStatements(Instruction start)
        // {
        //     var stack = new Stack<SyntaxNode>();

        //     var current = start;
        //     while (current != null)
        //     {
        //         if (current.OpCode == OpCodes.Ldarg_0)
        //         {
        //             stack.Push(new ArgumentReference(0));
        //         }
        //         else if (current.OpCode == OpCodes.Neg)
        //         {
        //             if (stack.Count < 1)
        //             {
        //                 throw new FormatException("Evaluation Stack underflow!");
        //             }
        //             var value = stack.Pop();
        //             stack.Push(new UnaryExpression(value, UnaryOperator.Negate));
        //         }
        //         else if (current.OpCode == OpCodes.Ldc_I4_0)
        //         {
        //             stack.Push(new Constant(0, MetadataType.Int32));
        //         }
        //         else if (current.OpCode == OpCodes.Clt)
        //         {
        //             if (stack.Count < 2)
        //             {
        //                 throw new FormatException("Evaluation Stack underflow!");
        //             }
        //             var value2 = stack.Pop();
        //             var value1 = stack.Pop();

        //             stack.Push(new BinaryExpression(value1, value2, BinaryOperator.LessThan));
        //         }
        //         else if (current.OpCode == OpCodes.Stloc_0)
        //         {
        //             yield return Stloc(stack, 0);
        //         }
        //         else if (current.OpCode == OpCodes.Stloc_1)
        //         {
        //             yield return Stloc(stack, 1);
        //         }
        //         else if (current.OpCode == OpCodes.Ldloc_0)
        //         {
        //             stack.Push(new LocalReference(0));
        //         }
        //         else if (current.OpCode == OpCodes.Ldloc_1)
        //         {
        //             stack.Push(new LocalReference(1));
        //         }
        //         else if (current.OpCode == OpCodes.Br_S || current.OpCode == OpCodes.Br)
        //         {
        //             yield return new BranchStatement("IL_" + ((Instruction)current.Operand).Offset.ToString("X4"));
        //         }
        //         else if (current.OpCode == OpCodes.Brfalse_S || current.OpCode == OpCodes.Brfalse)
        //         {
        //             if (stack.Count < 1)
        //             {
        //                 throw new FormatException("Evaluation Stack underflow!");
        //             }
        //             var value = stack.Pop();
        //             yield return new BranchStatement(value, false, "IL_" + ((Instruction)current.Operand).Offset.ToString("X4"));
        //         }
        //         else if(current.OpCode == OpCodes.Ret)
        //         {
        //             if (stack.Count < 1)
        //             {
        //                 throw new FormatException("Evaluation Stack underflow!");
        //             }
        //             var value = stack.Pop();
        //             yield return new ReturnStatement(value);
        //         }
        //         else if (current.OpCode != OpCodes.Nop)
        //         {
        //             yield break;
        //         }
        //         current = current.Next;
        //     }
        // }

        // private static StoreLocalStatement Stloc(Stack<SyntaxNode> stack, int index)
        // {
        //     if (stack.Count < 1)
        //     {
        //         throw new FormatException("Evaluation Stack underflow!");
        //     }
        //     var value = stack.Pop();
        //     return new StoreLocalStatement(index, value);
        // }
    }
}
