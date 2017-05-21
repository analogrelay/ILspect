using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mono.Cecil.Cil;

namespace ILspect.ControlFlow
{
    public class ControlFlowGraph
    {
        private readonly SortedDictionary<int, ControlFlowNode> _nodes;

        public IReadOnlyCollection<ControlFlowNode> Nodes => _nodes.Values;
        public IList<ExceptionHandler> ExceptionHandlers { get; }

        internal ControlFlowGraph(SortedDictionary<int, ControlFlowNode> nodes, IList<ExceptionHandler> exceptionHandlers)
        {
            _nodes = nodes;
            ExceptionHandlers = exceptionHandlers;
        }

        public static ControlFlowGraph Create(params ControlFlowNode[] nodes) =>
            Create((IEnumerable<ControlFlowNode>)nodes);

        public static ControlFlowGraph Create(IEnumerable<ControlFlowNode> nodes) =>
            Create(nodes, Enumerable.Empty<ExceptionHandler>());

        public static ControlFlowGraph Create(IEnumerable<ControlFlowNode> nodes, IEnumerable<ExceptionHandler> exceptionHandlers)
        {
            var dict = new SortedDictionary<int, ControlFlowNode>(nodes.ToDictionary(n => n.Offset));
            return new ControlFlowGraph(dict, exceptionHandlers.ToList());
        }

        public override string ToString()
        {
            var nodes = string.Join(Environment.NewLine, Nodes.Select(n => n.ToString()));

            var exceptionHandlers = string.Empty;
            if (ExceptionHandlers.Any())
            {
                exceptionHandlers = Environment.NewLine + string.Join(Environment.NewLine, ExceptionHandlers.Select(ExceptionHandlerToString));
            }

            return nodes + exceptionHandlers;
        }

        private static string ExceptionHandlerToString(ExceptionHandler handler)
        {
            var builder = new StringBuilder();
            builder.AppendLine(".try {");
            builder.AppendLine($"  IL_{handler.TryStart.Offset:X4} -> IL_{handler.TryEnd.Offset:X4}");
            builder.AppendLine("}");
            builder.AppendLine($"{FormatHandlerType(handler)} {{");
            if (handler.HandlerType == ExceptionHandlerType.Filter)
            {
                builder.AppendLine($"  IL_{handler.FilterStart.Offset:X4} -> IL_{handler.HandlerStart.Offset:X4}");
                builder.AppendLine("}");
                builder.AppendLine(".catch {");
            }
            builder.AppendLine($"  IL_{handler.HandlerStart.Offset:X4} -> IL_{handler.HandlerEnd.Offset:X4}");
            builder.AppendLine("}");
            return builder.ToString();
        }

        private static string FormatHandlerType(ExceptionHandler handler)
        {
            switch (handler.HandlerType)
            {
                case ExceptionHandlerType.Catch:
                    return $".catch({handler.CatchType})";
                case ExceptionHandlerType.Filter:
                    return $".filter";
                case ExceptionHandlerType.Finally:
                    return $".finally";
                case ExceptionHandlerType.Fault:
                    return $".fault";
                default:
                    throw new InvalidOperationException($"Unknown handler type {handler.HandlerType}");
            }
        }
    }
}