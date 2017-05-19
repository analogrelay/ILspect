using System;
using System.Collections.Generic;
using System.Linq;
using ILspect.ControlFlow;
using Mono.Cecil;
using Mono.Cecil.Cil;
using ILspect.Syntax.Statements;
using ILspect.Syntax.Expressions;

namespace ILspect.Syntax
{
    public static class SyntaxGraphBuilder
    {
        private static readonly Dictionary<OpCode, Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode>> _opCodeHandlers = new Dictionary<OpCode, Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode>>()
        {
            { OpCodes.Add, BinExpr(BinaryOperator.Add) },
            { OpCodes.Add_Ovf, Checked(BinExpr(BinaryOperator.Add)) },
            { OpCodes.Add_Ovf_Un, Checked(BinExpr(BinaryOperator.Add)) },
            { OpCodes.And, BinExpr(BinaryOperator.And) },
            { OpCodes.Arglist, Arglist },

            // For branch instructions, we just need to get the right expression on the stack
            // The graph already has the conditional jump data
            // For brtrue, the condition is already on the stack
            // For br, there is no condition needed and the opcode is a no-op for us because again, the jump is in the graph.
            { OpCodes.Br, null },
            { OpCodes.Br_S, null },
            { OpCodes.Brtrue, null },
            { OpCodes.Brtrue_S, null },
            { OpCodes.Brfalse, UnExpr(UnaryOperator.Not) },
            { OpCodes.Brfalse_S, UnExpr(UnaryOperator.Not) },
            { OpCodes.Beq, BinExpr(BinaryOperator.Equal) },
            { OpCodes.Beq_S, BinExpr(BinaryOperator.Equal) },
            { OpCodes.Bne_Un, BinExpr(BinaryOperator.NotEqual, unsigned: true) },
            { OpCodes.Bne_Un_S, BinExpr(BinaryOperator.NotEqual, unsigned: true) },
            { OpCodes.Bge, BinExpr(BinaryOperator.GreaterThanOrEqual) },
            { OpCodes.Bge_S, BinExpr(BinaryOperator.GreaterThanOrEqual) },
            { OpCodes.Bge_Un, BinExpr(BinaryOperator.GreaterThanOrEqual, unsigned: true) },
            { OpCodes.Bge_Un_S, BinExpr(BinaryOperator.GreaterThanOrEqual, unsigned: true) },
            { OpCodes.Bgt, BinExpr(BinaryOperator.GreaterThan) },
            { OpCodes.Bgt_S, BinExpr(BinaryOperator.GreaterThan) },
            { OpCodes.Bgt_Un, BinExpr(BinaryOperator.GreaterThan, unsigned: true) },
            { OpCodes.Bgt_Un_S, BinExpr(BinaryOperator.GreaterThan, unsigned: true) },
            { OpCodes.Ble, BinExpr(BinaryOperator.LessThanOrEqual) },
            { OpCodes.Ble_S, BinExpr(BinaryOperator.LessThanOrEqual) },
            { OpCodes.Ble_Un, BinExpr(BinaryOperator.LessThanOrEqual, unsigned: true) },
            { OpCodes.Ble_Un_S, BinExpr(BinaryOperator.LessThanOrEqual, unsigned: true) },
            { OpCodes.Blt, BinExpr(BinaryOperator.LessThan) },
            { OpCodes.Blt_S, BinExpr(BinaryOperator.LessThan) },
            { OpCodes.Blt_Un, BinExpr(BinaryOperator.LessThan, unsigned: true) },
            { OpCodes.Blt_Un_S, BinExpr(BinaryOperator.LessThan, unsigned: true) },

            { OpCodes.Box, Box },

            { OpCodes.Ceq, BinExpr(BinaryOperator.Equal) },
            { OpCodes.Cgt, BinExpr(BinaryOperator.GreaterThan) },
            { OpCodes.Cgt_Un, BinExpr(BinaryOperator.GreaterThan, unsigned: true) },
            { OpCodes.Conv_I, Conv(MetadataType.IntPtr, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_I1, Conv(MetadataType.SByte, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_I2, Conv(MetadataType.Int16, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_I4, Conv(MetadataType.Int32, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_I8, Conv(MetadataType.Int64, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_R4, Conv(MetadataType.Single, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_R8, Conv(MetadataType.Double, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_U, Conv(MetadataType.UIntPtr, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_U1, Conv(MetadataType.Byte, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_U2, Conv(MetadataType.UInt16, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_U4, Conv(MetadataType.UInt32, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_U8, Conv(MetadataType.UInt64, withOverflowDetection: false, unsigned: false) },
            { OpCodes.Conv_Ovf_I, Conv(MetadataType.IntPtr, withOverflowDetection: true, unsigned: false) },
            { OpCodes.Conv_Ovf_I1, Conv(MetadataType.SByte, withOverflowDetection: true, unsigned: false) },
            { OpCodes.Conv_Ovf_I2, Conv(MetadataType.Int16, withOverflowDetection: true, unsigned: false) },
            { OpCodes.Conv_Ovf_I4, Conv(MetadataType.Int32, withOverflowDetection: true, unsigned: false) },
            { OpCodes.Conv_Ovf_I8, Conv(MetadataType.Int64, withOverflowDetection: true, unsigned: false) },
            { OpCodes.Conv_Ovf_I1_Un, Conv(MetadataType.SByte, withOverflowDetection: true, unsigned: true) },
            { OpCodes.Conv_Ovf_I2_Un, Conv(MetadataType.Int16, withOverflowDetection: true, unsigned: true) },
            { OpCodes.Conv_Ovf_I4_Un, Conv(MetadataType.Int32, withOverflowDetection: true, unsigned: true) },
            { OpCodes.Conv_Ovf_I8_Un, Conv(MetadataType.Int64, withOverflowDetection: true, unsigned: true) },
            { OpCodes.Conv_Ovf_U, Conv(MetadataType.UIntPtr, withOverflowDetection: true, unsigned: false) },
            { OpCodes.Conv_Ovf_U1, Conv(MetadataType.Byte, withOverflowDetection: true, unsigned: false) },
            { OpCodes.Conv_Ovf_U2, Conv(MetadataType.UInt16, withOverflowDetection: true, unsigned: false) },
            { OpCodes.Conv_Ovf_U4, Conv(MetadataType.UInt32, withOverflowDetection: true, unsigned: false) },
            { OpCodes.Conv_Ovf_U8, Conv(MetadataType.UInt64, withOverflowDetection: true, unsigned: false) },
            { OpCodes.Conv_Ovf_U_Un, Conv(MetadataType.UIntPtr, withOverflowDetection: true, unsigned: true) },
            { OpCodes.Conv_Ovf_U1_Un, Conv(MetadataType.Byte, withOverflowDetection: true, unsigned: true) },
            { OpCodes.Conv_Ovf_U2_Un, Conv(MetadataType.UInt16, withOverflowDetection: true, unsigned: true) },
            { OpCodes.Conv_Ovf_U4_Un, Conv(MetadataType.UInt32, withOverflowDetection: true, unsigned: true) },
            { OpCodes.Conv_Ovf_U8_Un, Conv(MetadataType.UInt64, withOverflowDetection: true, unsigned: true) },
            { OpCodes.Div, BinExpr(BinaryOperator.Divide) },
            { OpCodes.Div_Un, BinExpr(BinaryOperator.Divide, unsigned: true) },
            { OpCodes.Dup, Dup },
            // endfilter
            // endfinally
            // initblk
            // jmp
            { OpCodes.Ldarg_0, LdArg(0) },
            { OpCodes.Ldarg_1, LdArg(1) },
            { OpCodes.Ldarg_2, LdArg(2) },
            { OpCodes.Ldarg_3, LdArg(3) },
            { OpCodes.Ldarg_S, LdArg(null) },
            // ldarg
            // ldarga
            { OpCodes.Ldc_I4, Ld(MetadataType.Int32) },
            { OpCodes.Ldc_I8, Ld(MetadataType.Int64) },
            { OpCodes.Ldc_R4, Ld(MetadataType.Single) },
            { OpCodes.Ldc_R8, Ld(MetadataType.Double) },
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
            // ldftn
            { OpCodes.Ldind_I, LdInd(MetadataType.IntPtr) },
            { OpCodes.Ldind_I1, LdInd(MetadataType.SByte) },
            { OpCodes.Ldind_I2, LdInd(MetadataType.Int16) },
            { OpCodes.Ldind_I4, LdInd(MetadataType.Int32) },
            { OpCodes.Ldind_I8, LdInd(MetadataType.Int64) },
            { OpCodes.Ldind_U1, LdInd(MetadataType.Byte) },
            { OpCodes.Ldind_U2, LdInd(MetadataType.UInt16) },
            { OpCodes.Ldind_U4, LdInd(MetadataType.UInt32) },
            { OpCodes.Ldind_R4, LdInd(MetadataType.Single) },
            { OpCodes.Ldind_R8, LdInd(MetadataType.Double) },
            { OpCodes.Ldind_Ref, LdInd(MetadataType.Object) },
            { OpCodes.Ldloc, LdLoc() },
            { OpCodes.Ldloc_S, LdLoc() },
            { OpCodes.Ldloc_0, LdLoc(0) },
            { OpCodes.Ldloc_1, LdLoc(1) },
            { OpCodes.Ldloc_2, LdLoc(2) },
            { OpCodes.Ldloc_3, LdLoc(3) },
            { OpCodes.Ldloca, Chain(UnExpr(UnaryOperator.AddressOf), LdLoc()) },
            { OpCodes.Ldloca_S, Chain(UnExpr(UnaryOperator.AddressOf), LdLoc()) },
            { OpCodes.Ldnull, Ldnull },
            // leave
            { OpCodes.Localloc, Localloc },
            { OpCodes.Mul, BinExpr(BinaryOperator.Multiply, withOverflowDetection: false) },
            { OpCodes.Mul_Ovf, BinExpr(BinaryOperator.Multiply, withOverflowDetection: true) },
            { OpCodes.Mul_Ovf_Un, BinExpr(BinaryOperator.Multiply, withOverflowDetection: true, unsigned: true) },
            { OpCodes.Nop, null }, // Nop does nothing!
            { OpCodes.Not, UnExpr(UnaryOperator.BitNot) },
            { OpCodes.Or, BinExpr(BinaryOperator.BitOr) },
            { OpCodes.Pop, Pop },
            { OpCodes.Rem, BinExpr(BinaryOperator.Remainder) },
            { OpCodes.Rem_Un, BinExpr(BinaryOperator.Remainder, unsigned: true) },
            { OpCodes.Ret, Return },
            { OpCodes.Shl, BinExpr(BinaryOperator.ShiftLeft) },
            { OpCodes.Shr, BinExpr(BinaryOperator.ShiftRight) },
            { OpCodes.Shr_Un, BinExpr(BinaryOperator.ShiftRight, unsigned: true) },
            { OpCodes.Starg, StArg },
            { OpCodes.Starg_S, StArg },
            { OpCodes.Stind_I1, StInd(MetadataType.Byte) },
            { OpCodes.Stind_I2, StInd(MetadataType.Int16) },
            { OpCodes.Stind_I4, StInd(MetadataType.Int32) },
            { OpCodes.Stind_I8, StInd(MetadataType.Int64) },
            { OpCodes.Stind_R4, StInd(MetadataType.Single) },
            { OpCodes.Stind_R8, StInd(MetadataType.Double) },
            { OpCodes.Stind_I, StInd(MetadataType.IntPtr) },
            { OpCodes.Stind_Ref, StInd(MetadataType.Object) },
            { OpCodes.Stloc, StLoc() },
            { OpCodes.Stloc_S, StLoc() },
            { OpCodes.Stloc_0, StLoc(0) },
            { OpCodes.Stloc_1, StLoc(1) },
            { OpCodes.Stloc_2, StLoc(2) },
            { OpCodes.Stloc_3, StLoc(3) },
            { OpCodes.Sub, BinExpr(BinaryOperator.Subtract) },
            { OpCodes.Sub_Ovf, BinExpr(BinaryOperator.Subtract, withOverflowDetection: true) },
            { OpCodes.Sub_Ovf_Un, BinExpr(BinaryOperator.Subtract, withOverflowDetection: true, unsigned: true) },
            //switch
            { OpCodes.Xor, BinExpr(BinaryOperator.BitXor) },

            { OpCodes.Isinst, Isinst },
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
            { OpCodes.Newobj, Call(CallType.Constructor) },
            { OpCodes.Neg, UnExpr(UnaryOperator.Negate) },
            { OpCodes.Callvirt, Call(CallType.Virtual) },
            { OpCodes.Call, Call(CallType.Normal) },
        };

        public static SyntaxGraph Create(ControlFlowGraph controlFlowGraph, MethodDefinition method) =>
            Create(controlFlowGraph, new MethodVariables(method));

        public static SyntaxGraph Create(ControlFlowGraph controlFlowGraph, MethodVariables variables)
        {
            var syntaxNodes = new SortedDictionary<int, SyntaxTreeNode>();

            // Populate the nodes list
            foreach (var controlFlowNode in controlFlowGraph.Nodes)
            {
                syntaxNodes.Add(controlFlowNode.Offset, new SyntaxTreeNode(controlFlowNode.Offset));
            }

            // Now fill them
            foreach (var controlFlowNode in controlFlowGraph.Nodes)
            {
                var stack = new Stack<Expression>();
                var syntaxNode = syntaxNodes[controlFlowNode.Offset];

                foreach (var instruction in controlFlowNode.Instructions)
                {
                    if (!_opCodeHandlers.TryGetValue(instruction.OpCode, out var handler))
                    {
                        throw new NotSupportedException($"Unsupported opcode: {instruction.OpCode}");
                    }
                    handler?.Invoke(variables, stack, instruction, syntaxNode);
                }

                // Copy the edges
                if (controlFlowNode.OutboundLinks.Any())
                {
                    var unconditional = controlFlowNode.OutboundLinks.Single(l => l.Condition == Condition.Unconditional);
                    var conditional = controlFlowNode.OutboundLinks.SingleOrDefault(l => l.Condition == Condition.Conditional);

                    syntaxNode.AddLink(null, syntaxNodes[unconditional.Target.Offset]);

                    if (conditional != null)
                    {
                        syntaxNode.AddLink(Pop(stack), syntaxNodes[conditional.Target.Offset]);
                    }
                }

                if (stack.Count > 0)
                {
                    throw new NotImplementedException("Not yet implemented: forwarding stacks");
                }
            }

            return new SyntaxGraph(syntaxNodes, variables);
        }

        private static void Pop(MethodVariables variables, Stack<Expression> stack, Instruction instruction, SyntaxTreeNode node)
        {
            node.AddStatement(new DiscardStatement(Pop(stack), instruction));
        }

        private static void Arglist(MethodVariables variables, Stack<Expression> stack, Instruction instruction, SyntaxTreeNode node)
        {
            stack.Push(new ArglistExpression(instruction));
        }

        private static void Localloc(MethodVariables variables, Stack<Expression> stack, Instruction instruction, SyntaxTreeNode node)
        {
            var size = Pop(stack);
            stack.Push(new LocallocExpression(size, instruction));
        }

        private static void Ldnull(MethodVariables variables, Stack<Expression> stack, Instruction instruction, SyntaxTreeNode node)
        {
            stack.Push(new ConstantExpression(null, MetadataType.Object, instruction));
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> Call(CallType callType)
        {
            return (variables, stack, instruction, node) =>
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
                var target = targetMethod.HasThis && callType != CallType.Constructor ?
                        Pop(stack) :
                        null;

                // Create the call expression
                var call = new CallExpression(targetMethod, callType, target, arguments, instruction);

                // Determine if this should go on the stack
                if (callType != CallType.Constructor && targetMethod.ReturnType.FullName.Equals("System.Void"))
                {
                    // It's a statement
                    node.AddStatement(new ExpressionStatement(call, instruction));
                }
                else
                {
                    // It's an expression
                    stack.Push(call);
                }
            };
        }

        private static void Dup(MethodVariables variables, Stack<Expression> stack, Instruction instruction, SyntaxTreeNode node)
        {
            // Store the current value in a temporary, then load it into the stack twice
            var value = Pop(stack);
            var temp = variables.CreateTemporary();
            node.AddStatement(new StoreTemporaryStatement(temp, value, instruction));
            stack.Push(new TemporaryExpression(temp, instruction));
            stack.Push(new TemporaryExpression(temp, instruction));
        }

        private static void Box(MethodVariables variables, Stack<Expression> stack, Instruction instruction, SyntaxTreeNode node)
        {
            var value = Pop(stack);
            stack.Push(new BoxingExpression(value, (TypeReference)instruction.Operand, instruction));
        }

        private static void Return(MethodVariables variables, Stack<Expression> stack, Instruction instruction, SyntaxTreeNode node)
        {
            var value = PopOrDefault(stack);
            node.AddStatement(new ReturnStatement(value, instruction));
        }

        private static void StArg(MethodVariables variables, Stack<Expression> stack, Instruction instruction, SyntaxTreeNode node)
        {
            var value = Pop(stack);
            node.AddStatement(new StoreParameterStatement((ParameterReference)instruction.Operand, value, instruction));
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> Conv(MetadataType type, bool withOverflowDetection, bool unsigned)
        {
            return (variables, stack, instruction, node) =>
            {
                var value = Pop(stack);
                stack.Push(new ConvertExpression(value, type, withOverflowDetection, unsigned, instruction));
            };
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> UnExpr(UnaryOperator @operator)
        {
            return (variables, stack, instruction, node) =>
            {
                var value = Pop(stack);
                stack.Push(new UnaryExpression(value, @operator, instruction));
            };
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> BinExpr(BinaryOperator @operator, bool withOverflowDetection = false, bool unsigned = false)
        {
            return (variables, stack, instruction, node) =>
            {
                var value2 = Pop(stack);
                var value1 = Pop(stack);
                stack.Push(new BinaryExpression(value1, value2, @operator, withOverflowDetection, unsigned, instruction));
            };
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> Chain(Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> outer, Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> inner)
        {
            return (variables, stack, instruction, node) =>
            {
                inner(variables, stack, instruction, node);
                outer(variables, stack, instruction, node);
            };
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> Checked(Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> subExpr)
        {
            return (variables, stack, instruction, node) =>
            {
                subExpr(variables, stack, instruction, node);
                var expr = Pop(stack);
                stack.Push(new CheckedExpression(expr, instruction));
            };
        }

        private static void Isinst(MethodVariables variables, Stack<Expression> stack, Instruction instruction, SyntaxTreeNode node)
        {
            var obj = Pop(stack);
            stack.Push(new IsTypeExpression(obj, (TypeReference)instruction.Operand, instruction));
        }

        private static void Ldlen(MethodVariables variables, Stack<Expression> stack, Instruction instruction, SyntaxTreeNode node)
        {
            var array = Pop(stack);
            stack.Push(new ArrayLengthExpression(array, instruction));
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> Ldelem(MetadataType type)
        {
            return (variables, stack, instruction, node) =>
            {
                var index = Pop(stack);
                var array = Pop(stack);
                stack.Push(new ArrayIndexExpression(array, index, type, instruction));
            };
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> StInd(MetadataType type)
        {
            return (variables, stack, instruction, node) =>
            {
                var value = Pop(stack);
                var addr = Pop(stack);
                node.AddStatement(new StoreIndirectStatement(addr, value, type, instruction));
            };
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> LdInd(MetadataType type)
        {
            return (variables, stack, instruction, node) =>
            {
                var addr = Pop(stack);
                stack.Push(new LoadIndirectExpression(addr, type, instruction));
            };
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> Ld(MetadataType type) => Ld<object>(type, constant: null, isConstant: false);
        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> Ld<T>(MetadataType type, T constant) => Ld<T>(type, constant, isConstant: true);
        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> Ld<T>(MetadataType type, T constant, bool isConstant)
        {
            return (variables, stack, instruction, node) =>
            {
                stack.Push(new ConstantExpression(isConstant ? constant : instruction.Operand, type, instruction));
            };
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> LdArg(int? index)
        {
            return (variables, stack, instruction, node) =>
            {
                ParameterReference parameter;
                if (index == null)
                {
                    parameter = ((ParameterReference)instruction.Operand);
                }
                else
                {
                    parameter = variables.GetParameter(index.Value);
                }
                stack.Push(new ParameterExpression(parameter, instruction));
            };
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> LdLoc(int? index = null)
        {
            return (variables, stack, instruction, node) =>
            {
                VariableReference local;
                if (index == null)
                {
                    local = ((VariableReference)instruction.Operand);
                }
                else
                {
                    local = variables.GetLocal(index.Value);
                }
                stack.Push(new LocalExpression(local, instruction));
            };
        }

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> StLoc(int? index = null)
        {
            return (variables, stack, instruction, node) =>
            {
                VariableReference local;
                if (index == null)
                {
                    local = ((VariableReference)instruction.Operand);
                }
                else
                {
                    local = variables.GetLocal(index.Value);
                }

                var value = Pop(stack);

                node.AddStatement(new AssignmentStatement(local, value, instruction));
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
