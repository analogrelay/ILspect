using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ILspect.ControlFlow;
using ILspect.Model;
using ILspect.Syntax;
using ILspect.Text;
using Microsoft.Extensions.CommandLineUtils;
using Mono.Cecil;
using static ILspect.CommandLine.CommandHelpers;

namespace ILspect.CommandLine.Commands
{
    public static class SyntaxCommand
    {
        private static readonly string Name = "syntax";

        internal static void Register(CommandLineApplication app)
        {
            app.Command(Name, cmd =>
            {
                cmd.Description = "Displays syntax analysis results for a member";

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

            ControlFlowGraph graph = null;
            MethodDefinition method = null;
            if (member.MemberType == MemberType.Method)
            {
                method = (MethodDefinition)member.Definition;
                graph = ControlFlowGraphBuilder.Build(method.Body);
            }
            else
            {
                return Error($"Member type not supported: {member.MemberType}");
            }

            var syntax = SyntaxGraphBuilder.Create(graph, method);

            var arguments = string.Join(", ", method.Parameters.Select(p => $"{p.ParameterType.FullName} {p.Name}"));

            Console.WriteLine($"Syntax analysis for {typeName}.{memberName}({arguments})");

            if (method.Body.Variables.Any())
            {
                Console.WriteLine();

                foreach (var local in method.Body.Variables)
                {
                    Console.WriteLine($"  .local {local.VariableType.FullName} _{local.Index}");
                }
            }

            foreach (var node in syntax.Nodes)
            {
                Console.WriteLine();
                Console.WriteLine($"  {node.DisplayName} : {{");
                foreach (var statement in node.Statements)
                {
                    Console.WriteLine($"    {statement}");
                }
                Console.WriteLine($"  }}{FormatLinks(node)}");
            }

            Console.WriteLine();

            return 0;
        }

        private static string FormatLinks(SyntaxTreeNode node)
        {
            if (node.OutboundLinks.Count == 0)
            {
                return string.Empty;
            }
            return " " + string.Join("; ", node.OutboundLinks.Select(FormatLink));
        }

        private static string FormatLink(SyntaxTreeLink link)
        {
            if (link.Expression == null)
            {
                return $"else -> {link.Target.DisplayName}";
            }

            return $"({link.Expression}) -> {link.Target.DisplayName}";
        }
    }
}