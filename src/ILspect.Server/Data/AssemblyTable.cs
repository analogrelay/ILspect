using System;
using System.Collections.Generic;
using System.IO;
using Mono.Cecil;

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
            
            using(var stream = File.OpenRead(path))
            {
                try
                {
                    model.Module = ModuleDefinition.ReadModule(stream);
                    model.HasMetadata = true;
                } 
                catch(Exception)
                {
                    model.Module = null;
                    model.HasMetadata = false;
                }
            }
            
            return model;
        }
        public AssemblyEntry GetAssembly(Guid id)
        {
            return _index[id];
        }
    }
}