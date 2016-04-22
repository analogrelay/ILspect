using System.Collections.Generic;

namespace ILspect.Server.ResponseModels
{
    public class TypeModel : MemberModel
    {
        public IEnumerable<MemberModel> Members { get; set; }
    }
}