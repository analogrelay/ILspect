using Mono.Cecil.Cil;

namespace ILspect
{
    public static class InstructionExtensions
    {
        public static bool IsBranch(this Instruction self)
        {

            return self.OpCode == OpCodes.Br ||
                self.OpCode == OpCodes.Br_S ||
                self.OpCode == OpCodes.Brfalse ||
                self.OpCode == OpCodes.Brfalse_S ||
                self.OpCode == OpCodes.Brtrue ||
                self.OpCode == OpCodes.Brtrue_S;
        }
    }
}