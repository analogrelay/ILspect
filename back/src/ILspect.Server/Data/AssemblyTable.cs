using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection.Metadata;
using System.Reflection.PortableExecutable;

namespace ILspect.Server.Data
{
    public class AssemblyTable
    {
        private Dictionary<Guid, AssemblyEntry> _index = new Dictionary<Guid, AssemblyEntry>();

        public IEnumerable<AssemblyEntry> Assemblies => _index.Values;

        public AssemblyEntry OpenAssembly(string path)
        {
            var id = Guid.NewGuid();
            var model = new AssemblyEntry(id);
            model.Name = Path.GetFileNameWithoutExtension(path);
            model.Path = path;

            // Open the assembly
            // These must be kept undisposed until the assembly is closed.
            model.PEReader = new PEReader(File.OpenRead(path));
            try
            {
                if (!model.PEReader.HasMetadata)
                {
                    model.PEReader.Dispose();
                    model.PEReader = null;
                    return model;
                }
                model.HasMetadata = true;

                var metadataReader = model.PEReader.GetMetadataReader();
                model.MetadataReader = metadataReader;
                _index[id] = model;
                return model;
            }
            catch (Exception)
            {
                model.PEReader?.Dispose();
                model.PEReader = null;
                throw;
            }
        }

        public AssemblyEntry GetAssembly(Guid id)
        {
            return _index[id];
        }
    }
}