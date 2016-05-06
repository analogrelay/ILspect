namespace ILspect.Data
{
    public class MemberDecompilation
    {
        public MemberEntity Member { get; }
        
        public string Body { get; }
        
        public MemberDecompilation(MemberEntity member, string body)
        {
            Body = body;
        }    
    }
}