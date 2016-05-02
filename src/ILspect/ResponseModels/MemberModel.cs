namespace ILspect.ResponseModels
{
    public class MemberModel : ServerObject
    {
        public string Name { get; set; }
        public MemberKind Kind { get; set; }

        public MemberModel(string id) : base(id) { }
    }
}