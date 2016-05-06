using System.Collections.Generic;

namespace ILspect.ResponseModels
{
    public class NamespaceModel : ModelBase
    {
        public string Name { get; set; }
        
        public IEnumerable<TypeModel> Types { get; set; }

        public NamespaceModel(string url, string disassemblyUrl) : base(url, disassemblyUrl) { } 
    }
}