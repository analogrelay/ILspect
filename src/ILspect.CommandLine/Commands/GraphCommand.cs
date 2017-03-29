using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ILspect.ControlFlow;
using ILspect.Model;
using Microsoft.Extensions.CommandLineUtils;
using Mono.Cecil;
using Mono.Cecil.Cil;
using static ILspect.CommandLine.CommandHelpers;

namespace ILspect.CommandLine.Commands
{
    public static class GraphCommand
    {
        private static readonly string Name = "graph";
        private static readonly Dictionary<string, Func<ControlFlowGraph, string, Task>> Formats = new Dictionary<string, Func<ControlFlowGraph, string, Task>>()
        {
            { "dot", DotGraphFormatter }
        };

        internal static void Register(CommandLineApplication app)
        {
            app.Command(Name, cmd =>
            {
                cmd.Description = "Graphs the control flow of the method";

                var assemblyArgument = cmd.Argument("<ASSEMBLY>", "The path to a .NET assembly to list members from");

                var typeNameOption = cmd.Option("-t|--type <TYPENAME>", "[REQUIRED] The name of the type to containing the member to graph", CommandOptionType.SingleValue);
                var memberNameOption = cmd.Option("-m|--member <MEMBERNAME>", "[REQUIRED] The name of the member to graph the control flow of", CommandOptionType.SingleValue);
                var outFileOption = cmd.Option("-o|--output <PATH>", "The path to the output file to write", CommandOptionType.SingleValue);
                var formatOption = cmd.Option("-f|--format <OUTPUTFORMAT>", $"The format of the output file (values include: {string.Join(", ", Formats.Keys)})", CommandOptionType.SingleValue);

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

                    return await Execute(assemblyArgument.Value, typeNameOption.Value(), memberNameOption.Value(), outFileOption.Value(), formatOption.Value());
                });
            });
        }

        private static async Task<int> Execute(string assemblyPath, string typeName, string memberName, string outFile, string format)
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
            if (member.MemberType == MemberType.Method)
            {
                graph = ControlFlowGraph.Create((MethodDefinition)member.Definition);
            }
            else
            {
                return Error($"Member type not supported: {member.MemberType}");
            }

            if (!string.IsNullOrEmpty(outFile))
            {
                format = string.IsNullOrEmpty(format) ? "dot" : format;
                if (!Formats.TryGetValue(format, out var handler))
                {
                    return Error($"Unknown format: {format}");
                }
                await handler(graph, outFile);
            }
            else
            {
                Console.WriteLine($"Control flow graph for {typeName}.{memberName}");
                foreach (var node in graph.AllNodes)
                {
                    Console.WriteLine();
                    Console.WriteLine($" {node.Name} : {{");
                    foreach (var instruction in node.Instructions)
                    {
                        Console.WriteLine($"   {instruction}");
                    }
                    if (node.Links.Count == 1)
                    {
                        Console.WriteLine($" }} -> {node.Links.First().Destination.Name}");
                    }
                    else if (node.Links.Count == 0)
                    {
                        Console.WriteLine(" } -> end;");
                    }
                    else
                    {
                        var targets = string.Join(", ", node.Links.Select(FormatLink));
                        Console.WriteLine($" }} {targets}");
                    }
                }
            }

            return 0;
        }

        private static string FormatLink(ControlFlowLink link)
        {
            if (link.Branch == null)
            {
                return $"else -> {link.Destination.Name}";
            }
            else
            {
                return $"{link.Branch.OpCode} -> {link.Destination.Name}";
            }
        }

        private static async Task DotGraphFormatter(ControlFlowGraph graph, string outFile)
        {
            using (var stream = new FileStream(outFile, FileMode.Create, FileAccess.ReadWrite, FileShare.None))
            using (var writer = new StreamWriter(stream))
            {
                await writer.WriteLineAsync("digraph ControlFlow {");

                await writer.WriteLineAsync("  graph[fontname=\"Courier\"];");
                await writer.WriteLineAsync("  node[fontname=\"Courier\",shape=\"box\"];");
                await writer.WriteLineAsync("  edge[fontname=\"Courier\"];");

                foreach (var node in graph.AllNodes)
                {
                    var content = node.Instructions.Count > 0 ?
                        node.Name + " {\\l" + string.Join("\\l", node.Instructions.Select(FormatInstruction)) + "\\l}\\l" :
                        node.Name;

                    await writer.WriteLineAsync($"  {node.Name}[label=\"{content}\"]");

                    if (node.Links.Count == 0)
                    {
                        await writer.WriteLineAsync($"  {node.Name} -> end;");
                    }
                    else
                    {
                        foreach (var link in node.Links)
                        {
                            if (link.Branch != null)
                            {
                                var label = link.Branch.OpCode.ToString();
                                await writer.WriteLineAsync($"  {node.Name} -> {link.Destination.Name}[label=\"{label}\"];");
                            }
                            else
                            {
                                await writer.WriteLineAsync($"  {node.Name} -> {link.Destination.Name}[label=\"else\"];");
                            }
                        }
                    }
                }
                await writer.WriteLineAsync("}");
            }
        }

        private static string FormatInstruction(Instruction arg)
        {
            var str = arg.ToString();
            var idx = str.IndexOf(":");
            return "  " + str.Substring(idx + 2);
        }
    }
}