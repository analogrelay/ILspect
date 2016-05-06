using System;

namespace ILspect.ResponseModels
{
    public class MemberModel
    {
        public string Name { get; set; }
        public string Details { get; set; }
        public MemberKind Kind { get; set; }
    }
}