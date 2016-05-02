using System.Collections.Generic;

namespace ILspect.ResponseModels
{
    public class NamespaceModel : ServerObject
    {
        public string Name { get; set; }
        
        public IEnumerable<TypeModel> Types { get; set; }

        public NamespaceModel(string id) : base(id) { }
    }
}