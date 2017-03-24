using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.CommandLineUtils;

using static ILspect.CommandLine.CommandHelpers;

namespace ILspect.CommandLine.Commands
{
    public static class ListNamespacesCommand
    {
        private static readonly string Name = "namespaces";
        internal static void Register(CommandLineApplication app)
        {
            app.Command(Name, cmd =>
            {
                cmd.Description = "Lists namespaces in the provided assembly";

                var assemblyArgument = cmd.Argument("<ASSEMBLY>", "The path to a .NET assembly to list namespaces from");

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
                    return await Execute(assemblyArgument.Value);
                });
            });
        }

        private static async Task<int> Execute(string assemblyPath)
        {
            var disassembler = new DisassemblerSession();

            var disassembly = await disassembler.LoadAsync(assemblyPath);

            foreach(var ns in disassembly.Namespaces)
            {
                Console.WriteLine($"* {ns.Name ?? "<Default>"}");
            }

            return 0;
        }
    }
}