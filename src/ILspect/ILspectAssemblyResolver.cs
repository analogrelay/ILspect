using System;
using Mono.Cecil;

namespace ILspect.Data
{
    internal class ILspectAssemblyResolver : IAssemblyResolver
    {
        public AssemblyDefinition Resolve(string fullName) => Resolve(AssemblyNameReference.Parse(fullName));

        public AssemblyDefinition Resolve(AssemblyNameReference name) => Resolve(name, new ReaderParameters());

        public AssemblyDefinition Resolve(string fullName, ReaderParameters parameters) => Resolve(AssemblyNameReference.Parse(fullName), parameters);


        public AssemblyDefinition Resolve(AssemblyNameReference name, ReaderParameters parameters) => null;
    }
}