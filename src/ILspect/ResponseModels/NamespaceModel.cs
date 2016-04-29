using System.Collections.Generic;

namespace ILspect.Server.ResponseModels
{
    public class NamespaceModel
    {
        public string Name { get; set; }
        
        public IEnumerable<TypeModel> Types { get; set; }
    }
}