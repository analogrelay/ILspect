using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ILspect.Model;
using Mono.Cecil;

namespace ILspect
{
    public class DisassemblerSession
    {
        private readonly Dictionary<string, Disassembly> _loadedAssemblies = new Dictionary<string, Disassembly>();
        private readonly DefaultAssemblyResolver _resolver = new DefaultAssemblyResolver();

        public IReadOnlyDictionary<string, Disassembly> Assemblies { get; }

        public DisassemblerSession()
        {
            Assemblies = new ReadOnlyDictionary<string, Disassembly>(_loadedAssemblies);
        }

        public async Task<Disassembly> LoadAsync(string assemblyPath)
        {
            // Normalize the path
            assemblyPath = Path.GetFullPath(assemblyPath);

            if (!_loadedAssemblies.TryGetValue(assemblyPath, out var disasm))
            {
                // Cecil's loading API is not async :(
                var parameters = new ReaderParameters(ReadingMode.Deferred)
                {
                    AssemblyResolver = _resolver
                };
                var asmDef = await Task.Run(() => AssemblyDefinition.ReadAssembly(assemblyPath, parameters));

                disasm = new Disassembly(asmDef);

                _loadedAssemblies[assemblyPath] = disasm;
                _resolver.Register(asmDef);
            }

            Debug.Assert(disasm != null);

            return disasm;
        }

        public object Disassemble(TypeDisassembly type)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
        }

    }
}