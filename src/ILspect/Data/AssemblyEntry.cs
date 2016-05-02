using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Mono.Cecil;

namespace ILspect.Data
{
    public class AssemblyEntry
    {
        public Guid Id { get; }
        public string Name { get; }
        public string Path { get; }
        public ModuleDefinition Module { get; }

        public IDictionary<string, NamespaceEntry> Namespaces { get; }

        public AssemblyEntry(Guid id, string name, string path, ModuleDefinition module)
        {
            Id = id;
            Name = name;
            Path = path;
            Module = module;
            Namespaces = new Dictionary<string, NamespaceEntry>();
        }

        public bool TryGetMember(string namespaceName, string typeName, string memberName, out MemberEntry member)
        {
            NamespaceEntry ns;
            if (Namespaces.TryGetValue(namespaceName, out ns))
            {
                TypeEntry typ;
                if (ns.Types.TryGetValue(typeName, out typ))
                {
                    if (typ.Members.TryGetValue(memberName, out member))
                    {
                        return true;
                    }
                }
            }
            member = null;
            return false;
        }
    }
}