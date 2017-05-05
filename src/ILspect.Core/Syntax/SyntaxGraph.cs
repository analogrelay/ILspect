using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using ILspect.ControlFlow;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class SyntaxGraph : Graph<Statement, Condition>
    {
        public SyntaxGraph(Node root, IDictionary<int, Node> nodes) : base(root, nodes)
        {
        }

        private static readonly Dictionary<OpCode, Action<DecompiledMethod, Stack<Expression>, Instruction, Node>> _opCodeHandlers = new Dictionary<OpCode, Action<DecompiledMethod, Stack<Expression>, Instruction, Node>>()
        {
            { OpCodes.Add, BinExpr(BinaryOperator.Add) },
            { OpCodes.Add_Ovf, Checked(BinExpr(BinaryOperator.Add)) },
            { OpCodes.Add_Ovf_Un, Checked(BinExpr(BinaryOperator.Add)) },
            { OpCodes.And, BinExpr(BinaryOperator.And) },
            { OpCodes.Box, Box },
            { OpCodes.Ceq, BinExpr(BinaryOperator.Equal) },
            { OpCodes.Cgt, BinExpr(BinaryOperator.GreaterThan) },
            { OpCodes.Cgt_Un, BinExpr(BinaryOperator.GreaterThan) },
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
            { OpCodes.Conv_Ovf_I, Conv(MetadataType.IntPtr) },
            { OpCodes.Conv_Ovf_I1, Conv(MetadataType.SByte) },
            { OpCodes.Conv_Ovf_I2, Conv(MetadataType.Int16) },
            { OpCodes.Conv_Ovf_I4, Conv(MetadataType.Int32) },
            { OpCodes.Conv_Ovf_I8, Conv(MetadataType.Int64) },
            { OpCodes.Conv_Ovf_I1_Un, Conv(MetadataType.SByte) },
            { OpCodes.Conv_Ovf_I2_Un, Conv(MetadataType.Int16) },
            { OpCodes.Conv_Ovf_I4_Un, Conv(MetadataType.Int32) },
            { OpCodes.Conv_Ovf_I8_Un, Conv(MetadataType.Int64) },
            { OpCodes.Conv_Ovf_U, Conv(MetadataType.UIntPtr) },
            { OpCodes.Conv_Ovf_U1, Conv(MetadataType.Byte) },
            { OpCodes.Conv_Ovf_U2, Conv(MetadataType.UInt16) },
            { OpCodes.Conv_Ovf_U4, Conv(MetadataType.UInt32) },
            { OpCodes.Conv_Ovf_U8, Conv(MetadataType.UInt64) },
            { OpCodes.Conv_Ovf_U_Un, Conv(MetadataType.UIntPtr) },
            { OpCodes.Conv_Ovf_U1_Un, Conv(MetadataType.Byte) },
            { OpCodes.Conv_Ovf_U2_Un, Conv(MetadataType.UInt16) },
            { OpCodes.Conv_Ovf_U4_Un, Conv(MetadataType.UInt32) },
            { OpCodes.Conv_Ovf_U8_Un, Conv(MetadataType.UInt64) },
            { OpCodes.Div, BinExpr(BinaryOperator.Divide) },
            { OpCodes.Div_Un, BinExpr(BinaryOperator.Divide) },
            { OpCodes.Dup, Dup },

            { OpCodes.Nop, null }, // Nop does nothing!
            { OpCodes.Isinst, Isinst },
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
            { OpCodes.Ldlen, Ldlen },
            { OpCodes.Clt, BinExpr(BinaryOperator.LessThan) },
            { OpCodes.Neg, UnExpr(UnaryOperator.Negate) },
            { OpCodes.Callvirt, Call(CallType.Virtual) },
            { OpCodes.Call, Call(CallType.Normal) },
            { OpCodes.Ret, Return }
        };

        public static SyntaxGraph Create(ControlFlowGraph graph, DecompiledMethod method)
        {
            // Note to myself that I can't ignore because it'll be a compiler error ;)
            Need to have SyntaxGraph nodes accept inputs.
            Popping when the stack is empty will create an input on the current node
            Each item on the stack when a control flow node is hit will be passed as inputs
            to the next node.

            var newNodes = new SortedList<int, Node>();
            var workQueue = new Queue<(ControlFlowGraph.Node node, Stack<Expression> stack)>();

            foreach (var node in graph.Nodes.Values)
            {
                var target = new Node(node.Offset);
                target.Type = node.Type;
                newNodes.Add(target.Offset, target);
            }

            // Queue the root item
            workQueue.Enqueue((node: graph.Root, stack: new Stack<Expression>()));

            while (workQueue.Count > 0)
            {
                var (node, stack) = workQueue.Dequeue();
                var target = newNodes[node.Offset];
                if (target.Contents.Count > 0)
                {
                    continue;
                }

                if (target.Type == NodeType.Filter)
                {
                    stack.Push(ImplicitValueExpression.Exception);
                }

                foreach (var instruction in node.Contents)
                {
                    if (!_opCodeHandlers.TryGetValue(instruction.OpCode, out var handler))
                    {
                        throw new NotSupportedException($"Unsupported opcode: {instruction.OpCode}");
                    }
                    handler?.Invoke(method, stack, instruction, target);
                }

                var nextStack = new List<Expression>();
                if (stack.Count > 0)
                {
                    // Store every entry in the stack in a temporary
                    foreach(var value in stack.Reverse())
                    {
                        var temp = method.NextTemporary();
                        target.Contents.Add(new StoreTemporaryStatement(temp, value, instruction: null));
                        nextStack.Add(new TemporaryExpression(temp, instruction: null));
                    }
                }

                foreach (var edge in node.OutboundEdges)
                {
                    var expr = GetConditionForEdge(stack, edge);
                    target.AddEdge(expr, newNodes[edge.Target.Offset]);

                    workQueue.Enqueue((node: edge.Target, stack: new Stack<Expression>(nextStack)));
                }
            }

            return new SyntaxGraph(newNodes[graph.Root.Offset], newNodes);
        }

        private static Condition GetConditionForEdge(Stack<Expression> stack, ControlFlowGraph.Edge edge)
        {
            if (edge.Value is BranchCondition<Instruction> b)
            {
                return new BranchCondition<Expression>(GetExpressionForBranch(stack, b));
            }
            return edge.Value;
        }

        private static Expression GetExpressionForBranch(Stack<Expression> stack, BranchCondition<Instruction> condition)
        {
            if (condition.Branch != null && condition.Branch.OpCode != OpCodes.Br && condition.Branch.OpCode != OpCodes.Br_S)
            {
                if (condition.Branch.OpCode == OpCodes.Brfalse || condition.Branch.OpCode == OpCodes.Brfalse_S ||
                    condition.Branch.OpCode == OpCodes.Brtrue || condition.Branch.OpCode == OpCodes.Brtrue_S)
                {
                    return Pop(stack);
                }
                else if (condition.Branch.OpCode == OpCodes.Beq || condition.Branch.OpCode == OpCodes.Beq_S)
                {
                    var value2 = Pop(stack);
                    var value1 = Pop(stack);
                    return new BinaryExpression(value1, value2, BinaryOperator.Equal, condition.Branch);
                }
                else if (condition.Branch.OpCode == OpCodes.Bne_Un || condition.Branch.OpCode == OpCodes.Bne_Un_S)
                {
                    var value2 = Pop(stack);
                    var value1 = Pop(stack);
                    return new BinaryExpression(value1, value2, BinaryOperator.NotEqual, condition.Branch);
                }
                else if (condition.Branch.OpCode == OpCodes.Bge || condition.Branch.OpCode == OpCodes.Bge_S ||
                        condition.Branch.OpCode == OpCodes.Bge_Un || condition.Branch.OpCode == OpCodes.Bge_Un_S)
                {
                    var value2 = Pop(stack);
                    var value1 = Pop(stack);
                    return new BinaryExpression(value1, value2, BinaryOperator.GreaterThanOrEqual, condition.Branch);
                }
                else if (condition.Branch.OpCode == OpCodes.Bgt || condition.Branch.OpCode == OpCodes.Bgt_S ||
                        condition.Branch.OpCode == OpCodes.Bgt_Un || condition.Branch.OpCode == OpCodes.Bgt_Un_S)
                {
                    var value2 = Pop(stack);
                    var value1 = Pop(stack);
                    return new BinaryExpression(value1, value2, BinaryOperator.GreaterThan, condition.Branch);
                }
                else if (condition.Branch.OpCode == OpCodes.Ble || condition.Branch.OpCode == OpCodes.Ble_S ||
                        condition.Branch.OpCode == OpCodes.Ble_Un || condition.Branch.OpCode == OpCodes.Ble_Un_S)
                {
                    var value2 = Pop(stack);
                    var value1 = Pop(stack);
                    return new BinaryExpression(value1, value2, BinaryOperator.LessThanOrEqual, condition.Branch);
                }
                else if (condition.Branch.OpCode == OpCodes.Blt || condition.Branch.OpCode == OpCodes.Blt_S ||
                        condition.Branch.OpCode == OpCodes.Blt_Un || condition.Branch.OpCode == OpCodes.Blt_Un_S)
                {
                    var value2 = Pop(stack);
                    var value1 = Pop(stack);
                    return new BinaryExpression(value1, value2, BinaryOperator.LessThan, condition.Branch);
                }
                else
                {
                    throw new InvalidOperationException($"Unrecognized Branch instruction: {condition.Branch}");
                }
            }

            return null;
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> Call(CallType callType)
        {
            return (DecompiledMethod method, Stack<Expression> stack, Instruction instruction, Node node) =>
            {
                var targetMethod = (MethodReference)instruction.Operand;

                // Pop the arguments, in reverse order
                var arguments = new List<Expression>(targetMethod.Parameters.Count);
                for (var i = 0; i < targetMethod.Parameters.Count; i++)
                {
                    var expr = Pop(stack);
                    arguments.Insert(0, expr);
                }

                // Pop the object reference
                var target = targetMethod.HasThis ?
                        Pop(stack) :
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
                    stack.Push(call);
                }
            };
        }

        private static void Dup(DecompiledMethod method, Stack<Expression> stack, Instruction instruction, Node node)
        {
            // Store the current value in a temporary, then load it into the stack twice
            var value = Pop(stack);
            var temp = method.NextTemporary();
            node.Contents.Add(new StoreTemporaryStatement(temp, value, instruction));
            stack.Push(new TemporaryExpression(temp, instruction));
            stack.Push(new TemporaryExpression(temp, instruction));
        }

        private static void Box(DecompiledMethod method, Stack<Expression> stack, Instruction instruction, Node node)
        {
            var value = Pop(stack);
            stack.Push(new BoxingExpression(value, (TypeReference)instruction.Operand, instruction));
        }

        private static void Return(DecompiledMethod method, Stack<Expression> stack, Instruction instruction, Node node)
        {
            var value = PopOrDefault(stack);
            node.Contents.Add(new ReturnStatement(value, instruction));
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> Conv(MetadataType type)
        {
            return (method, stack, instruction, node) =>
            {
                var value = Pop(stack);
                stack.Push(new ConvertExpression(value, type, instruction));
            };
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> UnExpr(UnaryOperator @operator)
        {
            return (method, stack, instruction, node) =>
            {
                var value = Pop(stack);
                stack.Push(new UnaryExpression(value, @operator, instruction));
            };
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> BinExpr(BinaryOperator @operator)
        {
            return (method, stack, instruction, node) =>
            {
                var value2 = Pop(stack);
                var value1 = Pop(stack);
                stack.Push(new BinaryExpression(value1, value2, @operator, instruction));
            };
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> Chain(Action<DecompiledMethod, Stack<Expression>, Instruction, Node> outer, Action<DecompiledMethod, Stack<Expression>, Instruction, Node> inner)
        {
            return (method, stack, instruction, node) =>
            {
                inner(method, stack, instruction, node);
                outer(method, stack, instruction, node);
            };
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> Checked(Action<DecompiledMethod, Stack<Expression>, Instruction, Node> subExpr)
        {
            return (method, stack, instruction, node) =>
            {
                subExpr(method, stack, instruction, node);
                var expr = Pop(stack);
                stack.Push(new CheckedExpression(expr, instruction));
            };
        }

        private static void Isinst(DecompiledMethod method, Stack<Expression> stack, Instruction instruction, Node node)
        {
            var obj = Pop(stack);
            stack.Push(new IsTypeExpression(obj, (TypeReference)instruction.Operand, instruction));
        }

        private static void Ldlen(DecompiledMethod method, Stack<Expression> stack, Instruction instruction, Node node)
        {
            var array = Pop(stack);
            stack.Push(new ArrayLengthExpression(array, instruction));
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> Ldelem(MetadataType type)
        {
            return (method, stack, instruction, node) =>
            {
                var index = Pop(stack);
                var array = Pop(stack);
                stack.Push(new ArrayIndexExpression(array, index, type, instruction));
            };
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> Ld(MetadataType type) => Ld<object>(type, constant: null, isConstant: false);
        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> Ld<T>(MetadataType type, T constant) => Ld<T>(type, constant, isConstant: true);
        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> Ld<T>(MetadataType type, T constant, bool isConstant)
        {
            return (method, stack, instruction, node) =>
            {
                stack.Push(new ConstantExpression(isConstant ? constant : instruction.Operand, type, instruction));
            };
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> LdArg(int index)
        {
            return (method, stack, instruction, node) =>
            {
                var parameter = method.Definition.Parameters.FirstOrDefault(p => p.Index == index);
                if (parameter == null)
                {
                    throw new FormatException($"Method does not have argument at index: {index}");
                }
                stack.Push(new ParameterExpression(parameter, instruction));
            };
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> LdLocA(int index)
        {
            return (method, stack, instruction, node) =>
            {
                var local = method.Definition.Body.Variables.FirstOrDefault(v => v.Index == index);
                if (local == null)
                {
                    throw new FormatException($"Method does not have local at index: {index}");
                }
                stack.Push(new VariableExpression(local, instruction));
            };
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> LdLoc(int? index = null)
        {
            return (method, stack, instruction, node) =>
            {
                VariableDefinition local;
                if (index == null)
                {
                    local = ((VariableReference)instruction.Operand).Resolve();
                }
                else
                {
                    local = method.Definition.Body.Variables.FirstOrDefault(v => v.Index == index);

                    if (local == null)
                    {
                        throw new FormatException($"Method does not have local at index: {index}");
                    }
                }
                stack.Push(new VariableExpression(local, instruction));
            };
        }

        private static Action<DecompiledMethod, Stack<Expression>, Instruction, Node> StLoc(int index)
        {
            return (method, stack, instruction, node) =>
            {
                var value = Pop(stack);

                var local = method.Definition.Body.Variables.FirstOrDefault(v => v.Index == index);
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