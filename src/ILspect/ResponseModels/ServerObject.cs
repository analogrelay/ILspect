namespace ILspect.ResponseModels
{
    public abstract class ServerObject
    {
        public string Id { get; }

        protected ServerObject(string id)
        {
            Id = id;
        }
    }
}
