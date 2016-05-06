using System;

namespace ILspect.ResponseModels
{
    public class MemberModel : ModelBase
    {
        public string Name { get; set; }
        public MemberKind Kind { get; set; }

        public MemberModel(string url, string disassemblyUrl) : base(url, disassemblyUrl) { } 
    }
}