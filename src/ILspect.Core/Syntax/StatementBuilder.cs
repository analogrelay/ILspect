using System;
using System.Collections.Generic;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public static class StatementBuilder
    {
        public static IEnumerable<Statement> ParseStatements(Instruction start)
        {
            var stack = new Stack<SyntaxNode>();

            var current = start;
            while (current != null)
            {
                if (current.OpCode == OpCodes.Ldarg_0)
                {
                    stack.Push(new ArgumentReference(0));
                }
                else if (current.OpCode == OpCodes.Neg)
                {
                    if (stack.Count < 1)
                    {
                        throw new FormatException("Evaluation Stack underflow!");
                    }
                    var value = stack.Pop();
                    stack.Push(new UnaryExpression(value, UnaryOperator.Negate));
                }
                else if (current.OpCode == OpCodes.Ldc_I4_0)
                {
                    stack.Push(new Constant(0, MetadataType.Int32));
                }
                else if (current.OpCode == OpCodes.Clt)
                {
                    if (stack.Count < 2)
                    {
                        throw new FormatException("Evaluation Stack underflow!");
                    }
                    var value2 = stack.Pop();
                    var value1 = stack.Pop();

                    stack.Push(new BinaryExpression(value1, value2, BinaryOperator.LessThan));
                }
                else if (current.OpCode == OpCodes.Stloc_0)
                {
                    yield return Stloc(stack, 0);
                }
                else if (current.OpCode == OpCodes.Stloc_1)
                {
                    yield return Stloc(stack, 1);
                }
                else if (current.OpCode == OpCodes.Ldloc_0)
                {
                    stack.Push(new LocalReference(0));
                }
                else if (current.OpCode == OpCodes.Ldloc_1)
                {
                    stack.Push(new LocalReference(1));
                }
                else if (current.OpCode == OpCodes.Br_S || current.OpCode == OpCodes.Br)
                {
                    yield return new BranchStatement("IL_" + ((Instruction)current.Operand).Offset.ToString("X4"));
                }
                else if (current.OpCode == OpCodes.Brfalse_S || current.OpCode == OpCodes.Brfalse)
                {
                    if (stack.Count < 1)
                    {
                        throw new FormatException("Evaluation Stack underflow!");
                    }
                    var value = stack.Pop();
                    yield return new BranchStatement(value, false, "IL_" + ((Instruction)current.Operand).Offset.ToString("X4"));
                }
                else if(current.OpCode == OpCodes.Ret)
                {
                    if (stack.Count < 1)
                    {
                        throw new FormatException("Evaluation Stack underflow!");
                    }
                    var value = stack.Pop();
                    yield return new ReturnStatement(value);
                }
                else if (current.OpCode != OpCodes.Nop)
                {
                    yield break;
                }
                current = current.Next;
            }
        }

        private static StoreLocalStatement Stloc(Stack<SyntaxNode> stack, int index)
        {
            if (stack.Count < 1)
            {
                throw new FormatException("Evaluation Stack underflow!");
            }
            var value = stack.Pop();
            return new StoreLocalStatement(index, value);
        }
    }
}
