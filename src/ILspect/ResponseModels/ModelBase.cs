namespace ILspect.ResponseModels
{
    public abstract class ModelBase
    {
        public string Url { get; }
        public string DisassemblyUrl { get; }

        protected ModelBase(string url, string disassemblyUrl)
        {
            Url = url;
            DisassemblyUrl = disassemblyUrl;
        }
    }
}