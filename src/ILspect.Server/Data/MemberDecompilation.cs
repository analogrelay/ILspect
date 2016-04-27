namespace ILspect.Server.Data
{
    public class MemberDecompilation
    {
        public MemberEntry Member { get; }
        
        public string Body { get; }
        
        public MemberDecompilation(MemberEntry member, string body)
        {
            Body = body;
        }    
    }
}