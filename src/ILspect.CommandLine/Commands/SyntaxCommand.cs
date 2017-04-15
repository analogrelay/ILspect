using System;
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
                graph = ControlFlowGraph.Create(method);
            }
            else
            {
                return Error($"Member type not supported: {member.MemberType}");
            }

            var syntax = SyntaxGraph.Create(graph, method);

            var arguments = string.Join(", ", method.Parameters.Select(p => $"{p.ParameterType.FullName} {p.Name}"));

            Console.WriteLine($"Syntax analysis for {typeName}.{memberName}({arguments})");

            if (method.Body.Variables.Any())
            {
                Console.WriteLine();
                Console.WriteLine("Locals: ");

                foreach (var local in method.Body.Variables)
                {
                    Console.WriteLine($"    {local.VariableType.FullName} _{local.Index}");
                }
            }

            foreach (var node in syntax.Nodes.Values)
            {
                Console.WriteLine();
                Console.WriteLine($"  {node.Name} : {{");
                foreach (var instruction in node.Contents)
                {
                    Console.WriteLine($"    {instruction}");
                }
                if (node.OutboundEdges.Count == 1)
                {
                    Console.WriteLine($"  }} -> {node.OutboundEdges.First().Target}");
                }
                else if (node.OutboundEdges.Count == 0)
                {
                    Console.WriteLine("  } -> end;");
                }
                else
                {
                    var targets = string.Join(", ", node.OutboundEdges.Select(FormatLink));
                    Console.WriteLine($"  }} {targets}");
                }
            }

            return 0;
        }

        private static string FormatLink(SyntaxGraph.Edge edge)
        {
            if (edge.Value == null)
            {
                return $"else -> {edge.Target}";
            }

            return $"{edge.Value} -> {edge.Target}";
        }
    }
}