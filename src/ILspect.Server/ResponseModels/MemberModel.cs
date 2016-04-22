namespace ILspect.Server.ResponseModels
{
    public class MemberModel
    {
        public string Name { get; set; }
        public MemberKind Kind { get; set; }
    }
    
    public enum MemberKind {
        Field,
        Method,
        Property,
        Event,
        Type
    }
}