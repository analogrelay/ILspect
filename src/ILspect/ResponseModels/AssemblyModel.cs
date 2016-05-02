using System.Collections.Generic;

namespace ILspect.ResponseModels
{
    public class AssemblyModel : ServerObject
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public bool HasMetadata { get; set; }
        public IEnumerable<NamespaceModel> Namespaces { get; set; }

        public AssemblyModel(string id) : base(id) { }
    }
}