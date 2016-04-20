namespace ILspect.Server.ResponseModels
{
    public class AssemblyModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public bool HasMetadata { get; set; }
    }
}