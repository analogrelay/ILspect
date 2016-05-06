using System.Collections.Generic;
using System.Linq;
using ILspect.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;

namespace ILspect.ResponseModels
{
    public class ModelBuilder
    {
        public IActionContextAccessor ActionContextAccessor { get; }
        public IUrlHelperFactory UrlFactory { get; }

        private IUrlHelper Url => UrlFactory.GetUrlHelper(ActionContextAccessor.ActionContext);

        public ModelBuilder(IActionContextAccessor actionContextAccessor, IUrlHelperFactory urlFactory)
        {
            ActionContextAccessor = actionContextAccessor;
            UrlFactory = urlFactory;
        }

        public AssemblyModel Build(AssemblyEntity entry)
        {
            var idValues = new
            {
                assemblyId = entry.Id
            };

            return new AssemblyModel(
                url: Url.Action("GetAssembly", "Objects", idValues),
                disassemblyUrl: Url.Action("DisassembleAssembly", "Disassembly", idValues))
            {
                Id = entry.Id,
                Name = entry.Name,
                Path = entry.Path,
                HasMetadata = entry.Module != null,
                Namespaces = BuildNamespaces(entry)
            };
        }

        public NamespaceModel Build(NamespaceEntity entry)
        {
            var idValues = new
            {
                assemblyId = entry.Assembly.Id,
                namespaceName = string.IsNullOrEmpty(entry.Name) ? Constants.DefaultNamespace : entry.Name,
            };

            return new NamespaceModel(
                url: Url.Action("GetNamespace", "Objects", idValues),
                disassemblyUrl: Url.Action("DisassembleNamespace", "Disassembly", idValues))
            {
                Name = entry.Name,
                Types = entry.Types.Values.OrderBy(t => t.Name).Select(Build)
            };
        }

        public TypeModel Build(TypeEntity entry)
        {
            var idValues = new
            {
                assemblyId = entry.Namespace.Assembly.Id,
                namespaceName = string.IsNullOrEmpty(entry.Namespace.Name) ? Constants.DefaultNamespace : entry.Namespace.Name,
                typeName = entry.Name
            };

            return new TypeModel(
                url: Url.Action("GetType", "Objects", idValues),
                disassemblyUrl: Url.Action("DisassembleType", "Disassembly", idValues))
            {
                Name = entry.Name,
                Kind = entry.Kind,
                Members = entry.Members.Values.OrderBy(t => t.Name).Select(Build)
            };
        }

        public MemberModel Build(MemberEntity entry)
        {
            var idValues = new
            {
                assemblyId = entry.Type.Namespace.Assembly.Id,
                namespaceName = string.IsNullOrEmpty(entry.Type.Namespace.Name) ? Constants.DefaultNamespace : entry.Type.Namespace.Name,
                typeName = entry.Type.Name,
                memberName = entry.Name
            };

            return new MemberModel(
                url: Url.Action("GetMember", "Objects", idValues),
                disassemblyUrl: Url.Action("DisassembleMember", "Disassembly", idValues))
            {
                Name = entry.Name,
                Kind = entry.Kind,
            };
        }

        private IEnumerable<NamespaceModel> BuildNamespaces(AssemblyEntity entry)
        {
            return entry.Namespaces.Values.OrderBy(n => n.Name).Select(Build);
        }
    }
}
