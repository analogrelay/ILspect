using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using ILspect.ControlFlow;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class SyntaxGraph : Graph<Statement, Expression>
    {
        public SyntaxGraph(Node root, IDictionary<string, Node> nodes) : base(root, nodes)
        {
        }

        private static readonly Dictionary<OpCode, Action<MethodDefinition, Stack<Expression>, Instruction, Node>> _opCodeHandlers = new Dictionary<OpCode, Action<MethodDefinition, Stack<Expression>, Instruction, Node>>()
        {
            { OpCodes.Add, BinExpr(BinaryOperator.Add) },
            { OpCodes.Add_Ovf, Checked(BinExpr(BinaryOperator.Add)) },
            { OpCodes.Add_Ovf_Un, Checked(BinExpr(BinaryOperator.Add)) },
            { OpCodes.And, BinExpr(BinaryOperator.And) },
            { OpCodes.Box, Box },
            { OpCodes.Ceq, BinExpr(BinaryOperator.Equal) },
            { OpCodes.Cgt, BinExpr(BinaryOperator.GreaterThan) },
            { OpCodes.Cgt_Un, BinExpr(BinaryOperator.GreaterThan) },

            { OpCodes.Nop, null }, // Nop does nothing!
            { OpCodes.Ldarg_0, LdArg(0) },
            { OpCodes.Ldarg_1, LdArg(1) },
            { OpCodes.Ldarg_2, LdArg(2) },
            { OpCodes.Ldarg_3, LdArg(3) },
            { OpCodes.Stloc_0, StLoc(0) },
            { OpCodes.Stloc_1, StLoc(1) },
            { OpCodes.Stloc_2, StLoc(2) },
            { OpCodes.Stloc_3, StLoc(3) },
            { OpCodes.Ldloca, Chain(UnExpr(UnaryOperator.AddressOf), LdLoc()) },
            { OpCodes.Ldloca_S, Chain(UnExpr(UnaryOperator.AddressOf), LdLoc()) },
            { OpCodes.Ldloc_0, LdLoc(0) },
            { OpCodes.Ldloc_1, LdLoc(1) },
            { OpCodes.Ldloc_2, LdLoc(2) },
            { OpCodes.Ldloc_3, LdLoc(3) },
            { OpCodes.Ldc_I4_0, Ld(MetadataType.Int32, 0) },
            { OpCodes.Ldc_I4_1, Ld(MetadataType.Int32, 1) },
            { OpCodes.Ldc_I4_2, Ld(MetadataType.Int32, 2) },
            { OpCodes.Ldc_I4_3, Ld(MetadataType.Int32, 3) },
            { OpCodes.Ldc_I4_4, Ld(MetadataType.Int32, 4) },
            { OpCodes.Ldc_I4_5, Ld(MetadataType.Int32, 5) },
            { OpCodes.Ldc_I4_6, Ld(MetadataType.Int32, 6) },
            { OpCodes.Ldc_I4_7, Ld(MetadataType.Int32, 7) },
            { OpCodes.Ldc_I4_8, Ld(MetadataType.Int32, 8) },
            { OpCodes.Ldc_I4_S, Ld(MetadataType.Int32) },
            { OpCodes.Ldc_I4, Ld(MetadataType.Int32) },
            { OpCodes.Ldstr, Ld(MetadataType.String) },
            { OpCodes.Ldelem_I, Ldelem(MetadataType.IntPtr) },
            { OpCodes.Ldelem_I1, Ldelem(MetadataType.SByte) },
            { OpCodes.Ldelem_I2, Ldelem(MetadataType.Int16) },
            { OpCodes.Ldelem_I4, Ldelem(MetadataType.Int32) },
            { OpCodes.Ldelem_R4, Ldelem(MetadataType.Single) },
            { OpCodes.Ldelem_R8, Ldelem(MetadataType.Double) },
            { OpCodes.Ldelem_Ref, Ldelem(MetadataType.Object) },
            { OpCodes.Ldelem_U1, Ldelem(MetadataType.Byte) },
            { OpCodes.Ldelem_U2, Ldelem(MetadataType.UInt16) },
            { OpCodes.Ldelem_U4, Ldelem(MetadataType.UInt32) },
            { OpCodes.Conv_I, Conv(MetadataType.IntPtr) },
            { OpCodes.Conv_I1, Conv(MetadataType.SByte) },
            { OpCodes.Conv_I2, Conv(MetadataType.Int16) },
            { OpCodes.Conv_I4, Conv(MetadataType.Int32) },
            { OpCodes.Conv_I8, Conv(MetadataType.Int64) },
            { OpCodes.Conv_R4, Conv(MetadataType.Single) },
            { OpCodes.Conv_R8, Conv(MetadataType.Double) },
            { OpCodes.Conv_U, Conv(MetadataType.UIntPtr) },
            { OpCodes.Conv_U1, Conv(MetadataType.Byte) },
            { OpCodes.Conv_U2, Conv(MetadataType.UInt16) },
            { OpCodes.Conv_U4, Conv(MetadataType.UInt32) },
            { OpCodes.Conv_U8, Conv(MetadataType.UInt64) },
            { OpCodes.Ldlen, Ldlen },
            { OpCodes.Clt, BinExpr(BinaryOperator.LessThan) },
            { OpCodes.Neg, UnExpr(UnaryOperator.Negate) },
            { OpCodes.Callvirt, Call(CallType.Virtual) },
            { OpCodes.Call, Call(CallType.Normal) },
            { OpCodes.Ret, Return }
        };

        public static SyntaxGraph Create(ControlFlowGraph graph, MethodDefinition method)
        {
            var evaluationStack = new Stack<Expression>();

            string RenderStack() => string.Join(", ", evaluationStack.Select(s => s.ToString()));

            var newNodes = new Dictionary<string, Node>();

            foreach (var node in graph.Nodes.Values)
            {
                var target = new Node(node.Name);
                newNodes.Add(target.Name, target);

                foreach (var instruction in node.Contents)
                {
                    if (!_opCodeHandlers.TryGetValue(instruction.OpCode, out var handler))
                    {
                        throw new NotSupportedException($"Unsupported opcode: {instruction.OpCode}");
                    }
                    handler?.Invoke(method, evaluationStack, instruction, target);
                }

                Debug.Assert(node.OutboundEdges.Count < 3, "Control flow graph nodes should never have more than 2 edges");
                Debug.Assert(node.OutboundEdges.Where(e => e.Value != null).Count() < 2, "Control flow graph nodes should never have more than one payload-bearing edge");

                foreach (var edge in node.OutboundEdges)
                {
                    var expr = GetExpressionForBranch(evaluationStack, edge);
                    target.OutboundEdges.Add(new SyntaxGraph.Edge(expr, target.Name, edge.Target));
                }

                if (evaluationStack.Count > 0)
                {
                    throw new NotSupportedException($"Can't handle evaluation stack being non-empty at the end of a control flow block yet! Stack: {RenderStack()}");
                }
            }

            Weave(newNodes);

            return new SyntaxGraph(newNodes[graph.Root.Name], newNodes);
        }

        private static Expression GetExpressionForBranch(Stack<Expression> evaluationStack, Graph<Instruction, Instruction>.Edge edge)
        {
            if (edge.Value != null && edge.Value.OpCode != OpCodes.Br && edge.Value.OpCode != OpCodes.Br_S)
            {
                if (edge.Value.OpCode == OpCodes.Brfalse || edge.Value.OpCode == OpCodes.Brfalse_S ||
                    edge.Value.OpCode == OpCodes.Brtrue || edge.Value.OpCode == OpCodes.Brtrue_S)
                {
                    return Pop(evaluationStack);
                }
                else if (edge.Value.OpCode == OpCodes.Beq || edge.Value.OpCode == OpCodes.Beq_S)
                {
                    var value2 = Pop(evaluationStack);
                    var value1 = Pop(evaluationStack);
                    return new BinaryExpression(value1, value2, BinaryOperator.Equal, edge.Value);
                }
                else if (edge.Value.OpCode == OpCodes.Bne_Un || edge.Value.OpCode == OpCodes.Bne_Un_S)
                {
                    var value2 = Pop(evaluationStack);
                    var value1 = Pop(evaluationStack);
                    return new BinaryExpression(value1, value2, BinaryOperator.NotEqual, edge.Value);
                }
                else if (edge.Value.OpCode == OpCodes.Bge || edge.Value.OpCode == OpCodes.Bge_S ||
                        edge.Value.OpCode == OpCodes.Bge_Un || edge.Value.OpCode == OpCodes.Bge_Un_S)
                {
                    var value2 = Pop(evaluationStack);
                    var value1 = Pop(evaluationStack);
                    return new BinaryExpression(value1, value2, BinaryOperator.GreaterThanOrEqual, edge.Value);
                }
                else if (edge.Value.OpCode == OpCodes.Bgt || edge.Value.OpCode == OpCodes.Bgt_S ||
                        edge.Value.OpCode == OpCodes.Bgt_Un || edge.Value.OpCode == OpCodes.Bgt_Un_S)
                {
                    var value2 = Pop(evaluationStack);
                    var value1 = Pop(evaluationStack);
                    return new BinaryExpression(value1, value2, BinaryOperator.GreaterThan, edge.Value);
                }
                else if (edge.Value.OpCode == OpCodes.Ble || edge.Value.OpCode == OpCodes.Ble_S ||
                        edge.Value.OpCode == OpCodes.Ble_Un || edge.Value.OpCode == OpCodes.Ble_Un_S)
                {
                    var value2 = Pop(evaluationStack);
                    var value1 = Pop(evaluationStack);
                    return new BinaryExpression(value1, value2, BinaryOperator.LessThanOrEqual, edge.Value);
                }
                else if (edge.Value.OpCode == OpCodes.Blt || edge.Value.OpCode == OpCodes.Blt_S ||
                        edge.Value.OpCode == OpCodes.Blt_Un || edge.Value.OpCode == OpCodes.Blt_Un_S)
                {
                    var value2 = Pop(evaluationStack);
                    var value1 = Pop(evaluationStack);
                    return new BinaryExpression(value1, value2, BinaryOperator.LessThan, edge.Value);
                }
                else
                {
                    throw new InvalidOperationException($"Unrecognized Branch instruction: {edge.Value}");
                }
            }

            return null;
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> Call(CallType callType)
        {
            return (MethodDefinition method, Stack<Expression> evaluationStack, Instruction instruction, Node node) =>
            {
                var targetMethod = (MethodReference)instruction.Operand;

                // Pop the arguments, in reverse order
                var arguments = new List<Expression>(targetMethod.Parameters.Count);
                for (var i = 0; i < targetMethod.Parameters.Count; i++)
                {
                    var expr = Pop(evaluationStack);
                    arguments.Insert(0, expr);
                }

                // Pop the object reference
                var target = targetMethod.HasThis ?
                        Pop(evaluationStack) :
                        null;

                // Create the call expression
                var call = new CallExpression(targetMethod, callType, target, arguments, instruction);

                // Determine if this should go on the stack
                if (targetMethod.ReturnType.FullName.Equals("System.Void"))
                {
                    // It's a statement
                    node.Contents.Add(new ExpressionStatement(call, instruction));
                }
                else
                {
                    // It's an expression
                    evaluationStack.Push(call);
                }
            };
        }

        private static void Box(MethodDefinition method, Stack<Expression> evaluationStack, Instruction instruction, Node node)
        {
            var value = Pop(evaluationStack);
            evaluationStack.Push(new BoxingExpression(value, (TypeReference)instruction.Operand, instruction));
        }

        private static void Return(MethodDefinition method, Stack<Expression> evaluationStack, Instruction instruction, Node node)
        {
            var value = PopOrDefault(evaluationStack);
            node.Contents.Add(new ReturnStatement(value, instruction));
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> Conv(MetadataType type)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var value = Pop(evaluationStack);
                evaluationStack.Push(new ConvertExpression(value, type, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> UnExpr(UnaryOperator @operator)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var value = Pop(evaluationStack);
                evaluationStack.Push(new UnaryExpression(value, @operator, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> BinExpr(BinaryOperator @operator)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var value2 = Pop(evaluationStack);
                var value1 = Pop(evaluationStack);
                evaluationStack.Push(new BinaryExpression(value1, value2, @operator, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> Chain(Action<MethodDefinition, Stack<Expression>, Instruction, Node> outer, Action<MethodDefinition, Stack<Expression>, Instruction, Node> inner)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                inner(method, evaluationStack, instruction, node);
                outer(method, evaluationStack, instruction, node);
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> Checked(Action<MethodDefinition, Stack<Expression>, Instruction, Node> subExpr)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                subExpr(method, evaluationStack, instruction, node);
                var expr = Pop(evaluationStack);
                evaluationStack.Push(new CheckedExpression(expr, instruction));
            };
        }

        private static void Ldlen(MethodDefinition method, Stack<Expression> evaluationStack, Instruction instruction, Node node)
        {
            var array = Pop(evaluationStack);
            evaluationStack.Push(new ArrayLengthExpression(array, instruction));
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> Ldelem(MetadataType type)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var index = Pop(evaluationStack);
                var array = Pop(evaluationStack);
                evaluationStack.Push(new ArrayIndexExpression(array, index, type, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> Ld(MetadataType type) => Ld<object>(type, constant: null, isConstant: false);
        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> Ld<T>(MetadataType type, T constant) => Ld<T>(type, constant, isConstant: true);
        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> Ld<T>(MetadataType type, T constant, bool isConstant)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                evaluationStack.Push(new ConstantExpression(isConstant ? constant : instruction.Operand, type, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> LdArg(int index)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var parameter = method.Parameters.FirstOrDefault(p => p.Index == index);
                if (parameter == null)
                {
                    throw new FormatException($"Method does not have argument at index: {index}");
                }
                evaluationStack.Push(new ParameterExpression(parameter, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> LdLocA(int index)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var local = method.Body.Variables.FirstOrDefault(v => v.Index == index);
                if (local == null)
                {
                    throw new FormatException($"Method does not have local at index: {index}");
                }
                evaluationStack.Push(new VariableExpression(local, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> LdLoc(int? index = null)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                VariableDefinition local;
                if (index == null)
                {
                    local = ((VariableReference)instruction.Operand).Resolve();
                }
                else
                {
                    local = method.Body.Variables.FirstOrDefault(v => v.Index == index);

                    if (local == null)
                    {
                        throw new FormatException($"Method does not have local at index: {index}");
                    }
                }
                evaluationStack.Push(new VariableExpression(local, instruction));
            };
        }

        private static Action<MethodDefinition, Stack<Expression>, Instruction, Node> StLoc(int index)
        {
            return (method, evaluationStack, instruction, node) =>
            {
                var value = Pop(evaluationStack);

                var local = method.Body.Variables.FirstOrDefault(v => v.Index == index);
                if (local == null)
                {
                    throw new FormatException($"Method does not have local at index: {index}");
                }
                node.Contents.Add(new AssignmentStatement(local, value, instruction));
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