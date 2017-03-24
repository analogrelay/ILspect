using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using ILspect.Model;
using Mono.Cecil;

namespace ILspect
{
    public class DisassemblerSession
    {
        private Dictionary<string, Disassembly> _loadedAssemblies = new Dictionary<string, Disassembly>();

        public async Task<Disassembly> LoadAsync(string assemblyPath)
        {
            // Normalize the path
            assemblyPath = Path.GetFullPath(assemblyPath);

            if (!_loadedAssemblies.TryGetValue(assemblyPath, out var disasm))
            {
                // Cecil's loading API is not async :(
                var asmDef = await Task.Run(() => AssemblyDefinition.ReadAssembly(assemblyPath));

                disasm = new Disassembly(asmDef);

                _loadedAssemblies[assemblyPath] = disasm;
            }

            Debug.Assert(disasm != null);

            return disasm;
        }
    }
}