using System.Text;
using Mono.Cecil;

namespace ILspect.Server.Services
{
    public class DecompilerVisitor : MetadataVisitor
    {
        public StringBuilder Decompilation { get; }
        
        public DecompilerVisitor()
        {
            Decompilation = new StringBuilder();
        }
        
        public override void Visit(MethodDefinition method)
        {
            
        }
    }
}