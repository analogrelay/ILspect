using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using Mono.Cecil.Cil;

namespace ILspect.ControlFlow
{
    // Represents a single span of instructions within a method.
    // A collection of InstructionSpans forms a spanning set of instructions for a method
    // No instruction is in two InstructionSpans and every instruction in a method is in an InstructionSpan
    public class InstructionSpan : IEnumerable<Instruction>
    {
        public Instruction First { get; }
        public Instruction Last { get; internal set; }

        public InstructionSpan(Instruction first)
        {
            First = first;
        }

        public IEnumerator<Instruction> GetEnumerator()
        {
            return Enumerate().GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return Enumerate().GetEnumerator();
        }

        private IEnumerable<Instruction> Enumerate()
        {
            var current = First;
            while(current != null)
            {
                yield return current;
                if(current == Last)
                {
                    // We're done
                    yield break;
                }

                current = current.Next;
            }

            Debug.Assert(Last == null);
        }
    }
}