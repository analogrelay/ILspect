using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
            var name = Path.GetFileNameWithoutExtension(path);

            ModuleDefinition module;
            using (var stream = File.OpenRead(path))
            {
                try
                {
                    module = ModuleDefinition.ReadModule(stream);
                }
                catch (Exception)
                {
                    return new AssemblyEntry(id, name, path, null);
                }
            }

            var assembly = new AssemblyEntry(id, name, path, module);

            var namespaces = module.Types
                .GroupBy(t => t.Namespace)
                .OrderBy(g => g.Key)
                .Select(g => LoadNamespace(assembly, g.Key, g));

            AddRange(assembly.Namespaces, namespaces, n => n.Name);

            return assembly;
        }

        private static NamespaceEntry LoadNamespace(AssemblyEntry assembly, string name, IEnumerable<TypeDefinition> types)
        {
            var ns = new NamespaceEntry(assembly, name);

            AddRange(ns.Types, types.Select(t => LoadType(ns, t)), t => t.Name);

            return ns;
        }

        private static TypeEntry LoadType(TypeEntry parent, TypeDefinition type)
        {
            return LoadType(parent.Namespace, parent, type);
        }

        private static TypeEntry LoadType(NamespaceEntry ns, TypeDefinition type)
        {
            return LoadType(ns, null, type);
        }

        private static TypeEntry LoadType(NamespaceEntry ns, TypeEntry parent, TypeDefinition type)
        {
            var typ = new TypeEntry(parent, ns, type.Name, type);

            AddRange(typ.Members, type.NestedTypes.Select(t => LoadType(typ, t)), t => t.Name);
            AddRange(typ.Members, type.Fields.Select(f => LoadMember(typ, MemberKind.Field, f)), f => f.Name);
            AddRange(typ.Members, type.Events.Select(e => LoadMember(typ, MemberKind.Event, e)), e => e.Name);
            AddRange(typ.Members, type.Properties.Select(e => LoadMember(typ, MemberKind.Property, e)), e => e.Name);
            AddRange(typ.Members, type.Methods.Select(e => LoadMember(typ, MemberKind.Method, e)), e => e.Name);

            return typ;
        }

        private static MemberEntry LoadMember(TypeEntry parent, MemberKind kind, IMemberDefinition member)
        {
            return new MemberEntry(parent, member.Name, kind, member);
        }

        private static void AddRange<T>(IDictionary<string, T> target, IEnumerable<T> items, Func<T, string> keySelector)
        {
            foreach (var item in items)
            {
                target[keySelector(item)] = item;
            }
        }

        public AssemblyEntry GetAssemblyOrDefault(string id)
        {
            AssemblyEntry entry;

            var gid = Guid.ParseExact(id, "N");
            if (!_index.TryGetValue(gid, out entry))
            {
                return null;
            }
            return entry;
        }

        public AssemblyEntry GetAssembly(string id)
        {
            return _index[Guid.ParseExact(id, "N")];
        }
    }
}