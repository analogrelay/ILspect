using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ILspect.ControlFlow;
using ILspect.Model;
using Microsoft.Extensions.CommandLineUtils;
using Mono.Cecil;
using static ILspect.CommandLine.CommandHelpers;

namespace ILspect.CommandLine.Commands
{
    public static class DisassembleCommand
    {
        private static readonly string Name = "disassemble";
        internal static void Register(CommandLineApplication app)
        {
            app.Command(Name, cmd =>
            {
                cmd.Description = "Disassembles a member";

                var assemblyArgument = cmd.Argument("<ASSEMBLY>", "The path to a .NET assembly to list members from");

                var typeNameOption = cmd.Option("-t|--type <TYPENAME>", "[REQUIRED] The name of the type to containing the member to graph", CommandOptionType.SingleValue);
                var memberNameOption = cmd.Option("-m|--member <MEMBERNAME>", "[REQUIRED] The name of the member to graph the control flow of", CommandOptionType.SingleValue);

                cmd.OnExecute(async () =>
                {
                    if (string.IsNullOrEmpty(assemblyArgument.Value))
                    {
                        return Error("missing required argument <ASSEMBLY>");
                    }

                    if (!typeNameOption.HasValue())
                    {
                        return Error("missing required option --type");
                    }

                    if (!memberNameOption.HasValue())
                    {
                        return Error("missing required option --member");
                    }

                    if (!File.Exists(assemblyArgument.Value))
                    {
                        return Error($"assembly does not exist {assemblyArgument.Value}");
                    }

                    return await Execute(assemblyArgument.Value, typeNameOption.Value(), memberNameOption.Value());
                });
            });
        }

        private static async Task<int> Execute(string assemblyPath, string typeName, string memberName)
        {
            var disassembler = new DisassemblerSession();

            var disassembly = await disassembler.LoadAsync(assemblyPath);

            var type = disassembly.FindType(typeName);
            if (type == null)
            {
                return Error($"could not find type: {typeName}");
            }
            var member = type.Members.FirstOrDefault(t => t.Name.Equals(memberName));
            if (member == null)
            {
                return Error($"could not find member: {memberName} in type {typeName}");
            }

            if (member.MemberType == MemberType.Method)
            {
                var method = (MethodDefinition)member.Definition;
                foreach (var instruction in method.Body.Instructions)
                {
                    Console.WriteLine(instruction);
                }
            }
            else
            {
                return Error($"Member type not supported: {member.MemberType}");
            }

            return 0;
        }
    }
}