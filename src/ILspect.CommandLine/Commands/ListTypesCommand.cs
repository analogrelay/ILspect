using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.CommandLineUtils;

using static ILspect.CommandLine.CommandHelpers;

namespace ILspect.CommandLine.Commands
{
    public static class ListTypesCommand
    {
        private static readonly string Name = "types";
        internal static void Register(CommandLineApplication app)
        {
            app.Command(Name, cmd =>
            {
                cmd.Description = "Lists types in the provided assembly";

                var assemblyArgument = cmd.Argument("<ASSEMBLY>", "The path to a .NET assembly to list types from");

                var namespaceOption = cmd.Option("-n|--namespace <NAMESPACE>", "Show only types in the specified namespace", CommandOptionType.SingleValue);

                cmd.OnExecute(async () =>
                {
                    if (string.IsNullOrEmpty(assemblyArgument.Value))
                    {
                        return Error("missing required argument <ASSEMBLY>");
                    }
                    if (!File.Exists(assemblyArgument.Value))
                    {
                        return Error($"assembly does not exist {assemblyArgument.Value}");
                    }
                    return await Execute(assemblyArgument.Value, namespaceOption.Value());
                });
            });
        }

        private static async Task<int> Execute(string assemblyPath, string namespaceFilter)
        {
            var disassembler = new DisassemblerSession();

            var disassembly = await disassembler.LoadAsync(assemblyPath);

            var types = disassembly.Types;
            if (!string.IsNullOrEmpty(namespaceFilter))
            {
                var ns = disassembly.Namespaces.FirstOrDefault(n =>
                {
                    var candidateName = n.Name ?? "<Default>";
                    return candidateName.Equals(namespaceFilter, StringComparison.OrdinalIgnoreCase);
                });

                if (ns == null)
                {
                    return Error($"namespace does not exist: {namespaceFilter}");
                }
                types = ns.Types;
            }

            foreach (var type in types)
            {
                Console.WriteLine($"* {type.FullName}");
            }

            return 0;
        }
    }
}