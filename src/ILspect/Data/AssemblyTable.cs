using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Mono.Cecil;

namespace ILspect.Data
{
    public class AssemblyTable
    {
        private Dictionary<Guid, AssemblyEntity> _index = new Dictionary<Guid, AssemblyEntity>();

        public AssemblyEntity AddAssembly(string path)
        {
            var assemblyId = Guid.NewGuid();
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
                    return new AssemblyEntity(assemblyId, name, path, null);
                }
            }

            var assembly = new AssemblyEntity(assemblyId, name, path, module);
            _index[assemblyId] = assembly;

            var namespaces = module.Types
                .GroupBy(t => t.Namespace)
                .OrderBy(g => g.Key)
                .Select(g => LoadNamespace(assembly, g.Key, g));
            AddRange(assembly.Namespaces, namespaces, n => n.Name);

            return assembly;
        }

        public IEnumerable<AssemblyEntity> GetAllAssemblies()
        {
            return _index.Values;
        }

        public AssemblyEntity GetAssembly(Guid id)
        {
            AssemblyEntity entity;
            if (!_index.TryGetValue(id, out entity))
            {
                return null;
            }
            return entity;
        }

        private static NamespaceEntity LoadNamespace(AssemblyEntity assembly, string name, IEnumerable<TypeDefinition> types)
        {
            var ns = new NamespaceEntity(assembly, name);

            AddRange(ns.Types, types.Select(t => LoadType(ns, t)), t => t.Name);

            return ns;
        }

        private static TypeEntity LoadType(TypeEntity parent, TypeDefinition type)
        {
            return LoadType(parent.Namespace, parent, type);
        }

        private static TypeEntity LoadType(NamespaceEntity ns, TypeDefinition type)
        {
            return LoadType(ns, null, type);
        }

        private static TypeEntity LoadType(NamespaceEntity ns, TypeEntity parent, TypeDefinition type)
        {
            var typ = new TypeEntity(parent, ns, type.Name, type);

            AddRange(typ.Members, type.NestedTypes.Select(t => LoadType(typ, t)), t => t.Name);
            AddRange(typ.Members, type.Fields.Select(f => LoadMember(typ, MemberKind.Field, f)), f => f.Name);
            AddRange(typ.Members, type.Events.Select(e => LoadMember(typ, MemberKind.Event, e)), e => e.Name);
            AddRange(typ.Members, type.Properties.Select(e => LoadMember(typ, MemberKind.Property, e)), e => e.Name);
            AddRange(typ.Members, type.Methods.Select(e => LoadMember(typ, MemberKind.Method, e)), e => e.Name);

            return typ;
        }

        private static MemberEntity LoadMember(TypeEntity parent, MemberKind kind, IMemberDefinition member)
        {
            return new MemberEntity(parent, member.Name, kind, member);
        }

        private static void AddRange<K, V>(IDictionary<K, V> dict, IEnumerable<V> entities, Func<V, K> keySelector)
        {
            foreach (var entity in entities)
            {
                dict[keySelector(entity)] = entity;
            }
        }

    }
}