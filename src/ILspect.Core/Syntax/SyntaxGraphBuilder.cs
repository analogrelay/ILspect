﻿using System;
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
            { OpCodes.Bne_Un, BinExpr(BinaryOperator.NotEqual) },
            { OpCodes.Bne_Un_S, BinExpr(BinaryOperator.NotEqual) },
            { OpCodes.Bge, BinExpr(BinaryOperator.GreaterThanOrEqual) },
            { OpCodes.Bge_S, BinExpr(BinaryOperator.GreaterThanOrEqual) },
            { OpCodes.Bge_Un, BinExpr(BinaryOperator.GreaterThanOrEqual) },
            { OpCodes.Bge_Un_S, BinExpr(BinaryOperator.GreaterThanOrEqual) },
            { OpCodes.Bgt, BinExpr(BinaryOperator.GreaterThan) },
            { OpCodes.Bgt_S, BinExpr(BinaryOperator.GreaterThan) },
            { OpCodes.Bgt_Un, BinExpr(BinaryOperator.GreaterThan) },
            { OpCodes.Bgt_Un_S, BinExpr(BinaryOperator.GreaterThan) },
            { OpCodes.Ble, BinExpr(BinaryOperator.LessThanOrEqual) },
            { OpCodes.Ble_S, BinExpr(BinaryOperator.LessThanOrEqual) },
            { OpCodes.Ble_Un, BinExpr(BinaryOperator.LessThanOrEqual) },
            { OpCodes.Ble_Un_S, BinExpr(BinaryOperator.LessThanOrEqual) },
            { OpCodes.Blt, BinExpr(BinaryOperator.LessThan) },
            { OpCodes.Blt_S, BinExpr(BinaryOperator.LessThan) },
            { OpCodes.Blt_Un, BinExpr(BinaryOperator.LessThan) },
            { OpCodes.Blt_Un_S, BinExpr(BinaryOperator.LessThan) },

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

            { OpCodes.Nop, null }, // Nop does nothing!
            { OpCodes.Isinst, Isinst },
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
            { OpCodes.Pop, Pop },
            { OpCodes.Callvirt, Call(CallType.Virtual) },
            { OpCodes.Call, Call(CallType.Normal) },
            { OpCodes.Ret, Return }
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
                if(controlFlowNode.OutboundLinks.Any())
                {
                    var unconditional = controlFlowNode.OutboundLinks.Single(l => l.Condition == Condition.Unconditional);
                    var conditional = controlFlowNode.OutboundLinks.SingleOrDefault(l => l.Condition == Condition.Conditional);

                    syntaxNode.AddLink(null, syntaxNodes[unconditional.Target.Offset]);

                    if (conditional != null)
                    {
                        syntaxNode.AddLink(Pop(stack), syntaxNodes[conditional.Target.Offset]);
                    }
                }

                if(stack.Count > 0)
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

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> Call(CallType callType)
        {
            return (MethodVariables variables, Stack<Expression> stack, Instruction instruction, SyntaxTreeNode node) =>
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

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> Conv(MetadataType type)
        {
            return (variables, stack, instruction, node) =>
            {
                var value = Pop(stack);
                stack.Push(new ConvertExpression(value, type, instruction));
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

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> BinExpr(BinaryOperator @operator)
        {
            return (variables, stack, instruction, node) =>
            {
                var value2 = Pop(stack);
                var value1 = Pop(stack);
                stack.Push(new BinaryExpression(value1, value2, @operator, instruction));
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

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> LdLocA(int index)
        {
            return (variables, stack, instruction, node) =>
            {
                stack.Push(new LocalExpression(variables.GetLocal(index), instruction));
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

        private static Action<MethodVariables, Stack<Expression>, Instruction, SyntaxTreeNode> StLoc(int index)
        {
            return (variables, stack, instruction, node) =>
            {
                var value = Pop(stack);

                node.AddStatement(new AssignmentStatement(variables.GetLocal(index), value, instruction));
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