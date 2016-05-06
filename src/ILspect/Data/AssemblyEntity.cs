using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Mono.Cecil;

namespace ILspect.Data
{
    public class AssemblyEntity
    {
        public Guid Id { get; }
        public string Name { get; }
        public string Path { get; }
        public ModuleDefinition Module { get; }
        public IDictionary<string, NamespaceEntity> Namespaces { get; }

        public AssemblyEntity(Guid id, string name, string path, ModuleDefinition module)
        {
            Id = id;
            Name = name;
            Path = path;
            Module = module;
            Namespaces = new Dictionary<string, NamespaceEntity>();
        }

        public bool TryGetMember(string ns, string type, string member, out MemberEntity entity)
        {
            entity = null;

            NamespaceEntity nsEntity;
            if(Namespaces.TryGetValue(ns, out nsEntity))
            {
                TypeEntity typeEntity;
                if(nsEntity.Types.TryGetValue(type, out typeEntity))
                {
                    return typeEntity.Members.TryGetValue(member, out entity);
                }
            }

            return false;
        }
    }
}