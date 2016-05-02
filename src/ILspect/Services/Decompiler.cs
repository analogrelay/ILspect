using ILspect.Data;

namespace ILspect.Services
{
    public class Decompiler
    {
        public MemberDecompilation DecompileMember(MemberEntry member)
        {
            var visitor = new DecompilerVisitor();
            member.Definition.Accept(visitor);

            return new MemberDecompilation(member, visitor.Decompilation.ToString());
        }
    }
}