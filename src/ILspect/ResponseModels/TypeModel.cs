using System.Collections.Generic;

namespace ILspect.ResponseModels
{
    public class TypeModel : MemberModel
    {
        public IEnumerable<MemberModel> Members { get; set; }

        public TypeModel(string url, string disassemblyUrl) : base(url, disassemblyUrl) { } 
    }
}