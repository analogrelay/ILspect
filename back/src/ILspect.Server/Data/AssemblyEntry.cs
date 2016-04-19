using System;
using System.Linq;
using System.Reflection.Metadata;
using System.Reflection.PortableExecutable;

namespace ILspect.Server.Data
{
    public class AssemblyEntry : IDisposable
    {
        public Guid Id { get; }
        public string Name { get; set; }
        public string Path { get; set; }
        public bool HasMetadata { get; set; }
        public MetadataReader MetadataReader { get; set; }
        public PEReader PEReader { get; set; }

        public AssemblyEntry(Guid id)
        {
            Id = id;
        }

        public void Dispose()
        {
            MetadataReader = null;
            var reader = PEReader;
            PEReader = null;
            reader.Dispose();
        }

        public NamespaceDefinition? GetNamespace(string fullName)
        {
            var path = fullName.Split('.');
            var current = MetadataReader.GetNamespaceDefinitionRoot();
            foreach (var segment in path)
            {
                Console.WriteLine($"Searching for {segment}");
                NamespaceDefinition? sub = current.NamespaceDefinitions
                    .Select(h => MetadataReader.GetNamespaceDefinition(h))
                    .FirstOrDefault(d => string.Equals(MetadataReader.GetString(d.Name), segment, StringComparison.Ordinal));
                if (sub == null)
                {
                    return null;
                }
                current = sub.Value;
            }
            return current;
        }
    }
}