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
        private static readonly Dictionary<OpCode, Action<MethodDefinition, Stack<Expression>, Instruction, SyntaxGraph.Node>> _opCodeHandlers = new Dictionary<OpCode, Action<MethodDefinition, Stack<Expression>, Instruction, SyntaxGraph.Node>>()
        {
            { OpCodes.Nop, null }, // Nop does nothing!
            { OpCodes.Ldarg_0, LdArg(0) },
            { OpCodes.Ldarg_1, LdArg(1) },
            { OpCodes.Ldarg_2, LdArg(2) },
            { OpCodes.Ldarg_3, LdArg(3) },
            { OpCodes.Stloc_0, StLoc(0) },
            { OpCodes.Stloc_1, StLoc(1) },
            { OpCodes.Stloc_2, StLoc(2) },
            { OpCodes.Stloc_3, StLoc(3) },
            { OpCodes.Ldloc_0, LdLoc(0) },
            { OpCodes.Ldloc_1, LdLoc(1) },
            { OpCodes.Ldloc_2, LdLoc(2) },
            { OpCodes.Ldloc_3, LdLoc(3) },
            { OpCodes.Ldc_I4_0, LdcI4(0) },
            { OpCodes.Ldc_I4_1, LdcI4(1) },
            { OpCodes.Ldc_I4_2, LdcI4(2) },
            { OpCodes.Ldc_I4_3, LdcI4(3) },
            { OpCodes.Ldc_I4_4, LdcI4(4) },
            { OpCodes.Ldc_I4_5, LdcI4(5) },
            { OpCodes.Ldc_I4_6, LdcI4(6) },
            { OpCodes.Ldc_I4_7, LdcI4(7) },
            { OpCodes.Ldc_I4_8, LdcI4(8) },
            { OpCodes.Clt, BinExpr(BinaryOperator.LessThan) },
            { OpCodes.Add, BinExpr(BinaryOperator.Add) },
            { OpCodes.Neg, UnExpr(UnaryOperator.Negate) },
            { OpCodes.Ret, Return }
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

                if (target.Payload.Count > 0)
                {
                    continue;
                }

                foreach (var instruction in current.Payload)
                {
                    if (!_opCodeHandlers.TryGetValue(instruction.OpCode, out var handler))
                    {
                        throw new NotSupportedException($"Unsupported opcode: {instruction.OpCode}");
                    }
                    Console.WriteLine($"Processing: {instruction}...");
                    handler?.Invoke(method, evaluationStack, instruction, target);
                }

                Debug.Assert(current.Edges.Count < 3, "Control flow graph nodes should never have more than 2 edges");
                Debug.Assert(current.Edges.Where(e => e.Payload != null).Count() < 2, "Control flow graph nodes should never have more than one payload-bearing edge");

                foreach (var edge in current.Edges)
                {
                    Expression expr = null;
                    if (edge.Payload != null && edge.Payload.OpCode != OpCodes.Br && edge.Payload.OpCode != OpCodes.Br_S)
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

        private static void Return(MethodDefinition method, Stack<Expression> evaluationStack, Instruction instruction, SyntaxGraph.Node node)
        {
            var value = PopOrDefault(evaluationStack);
            node.Payload.Add(new ReturnStatement(value, instruction));
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, SyntaxGraph.Node> LdLoc(int index)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var local = method.Body.Variables.FirstOrDefault(v => v.Index == index);
                if (local == null)
                {
                    throw new FormatException($"Method does not have local at index: {index}");
                }
                evaluationStack.Push(new VariableReference(local, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, SyntaxGraph.Node> StLoc(int index)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var value = Pop(evaluationStack);

                var local = method.Body.Variables.FirstOrDefault(v => v.Index == index);
                if (local == null)
                {
                    throw new FormatException($"Method does not have local at index: {index}");
                }
                node.Payload.Add(new AssignmentStatement(local, value, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, SyntaxGraph.Node> UnExpr(UnaryOperator @operator)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var value = Pop(evaluationStack);
                evaluationStack.Push(new UnaryExpression(value, @operator, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, SyntaxGraph.Node> BinExpr(BinaryOperator @operator)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var value2 = Pop(evaluationStack);
                var value1 = Pop(evaluationStack);
                evaluationStack.Push(new BinaryExpression(value1, value2, @operator, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, SyntaxGraph.Node> LdcI4(int value)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                evaluationStack.Push(new Constant(value, MetadataType.Int32, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, SyntaxGraph.Node> LdArg(int index)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var parameter = method.Parameters.FirstOrDefault(p => p.Index == index);
                if (parameter == null)
                {
                    throw new FormatException($"Method does not have argument at index: {index}");
                }
                evaluationStack.Push(new ParameterReference(parameter, instruction));
            };
        }

        private static Expression PopOrDefault(Stack<Expression> stack)
        {
            if (stack.Count < 1)
            {
                return null;
            }
            return stack.Pop();
        }

        private static Expression Pop(Stack<Expression> stack)
        {
            if (stack.Count < 1)
            {
                throw new FormatException("Evaluation stack underflow!");
            }
            return stack.Pop();
        }
    }
}
