using System;
using System.Collections.Generic;
using Mono.Cecil;

namespace ILspect
{
    public class DefaultAssemblyResolver : IAssemblyResolver
    {
        private readonly Dictionary<string, AssemblyDefinition> _cache = new Dictionary<string, AssemblyDefinition>();

        public AssemblyDefinition Resolve(AssemblyNameReference name)
        {
            if (_cache.TryGetValue(name.FullName, out var asmDef))
            {
                return asmDef;
            }
            return LoadAssembly(name, new ReaderParameters(ReadingMode.Deferred));
        }

        public AssemblyDefinition Resolve(AssemblyNameReference name, ReaderParameters parameters)
        {
            if (_cache.TryGetValue(name.FullName, out var asmDef))
            {
                return asmDef;
            }
            return LoadAssembly(name, parameters);
        }

        public void Register(AssemblyDefinition asmDef)
        {
            _cache[asmDef.FullName] = asmDef;
        }

        public void Dispose()
        {
        }

        private AssemblyDefinition LoadAssembly(AssemblyNameReference name, ReaderParameters readerParameters)
        {
            var path = FindAssembly(name);

            if (string.IsNullOrEmpty(path))
            {
                return null;
            }

            var asm = AssemblyDefinition.ReadAssembly(path, readerParameters);
            Register(asm);
            return asm;
        }

        private string FindAssembly(AssemblyNameReference name)
        {
            if (name.FullName.Equals("System.Runtime, Version=4.0.20.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"))
            {
                return @"C:\Users\anurse\.nuget\packages\system.runtime\4.3.0\ref\netstandard1.3\System.Runtime.dll";
            }
            return null;
        }
    }
}