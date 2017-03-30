using System.Collections.Generic;
using System.IO;
using System.Text;
using ILspect.Text;
using Mono.Cecil;

namespace ILspect
{
    public static class CILDisassembler
    {
        private static readonly Dictionary<string, string> _cilTypeNames = new Dictionary<string, string>()
        {
            { "System.Boolean", "bool" },
            { "System.Char", "char" },
            { "System.String", "string" },
            { "System.Single", "float32" },
            { "System.Double", "float64" },
            { "System.SByte", "int8" },
            { "System.Int16", "int16" },
            { "System.Int32", "int32" },
            { "System.Int64", "int64" },
            { "System.IntPtr", "native int" },
            { "System.UIntPtr", "native unsigned int" },
            { "System.TypedReference", "typedref" },
            { "System.Byte", "unsigned int8" },
            { "System.UInt16", "unsigned int16" },
            { "System.UInt32", "unsigned int32" },
            { "System.UInt64", "unsigned int64" }
        };

        public static string DisassembleMethod(MethodDefinition method)
        {
            var writer = new StringWriter();
            DisassembleMethod(method, new IndentingWriter(writer));
            return writer.ToString();
        }

        public static void DisassembleMethod(MethodDefinition method, TextWriter writer) => DisassembleMethod(method, new IndentingWriter(writer, 0, ' '));

        public static void DisassembleMethod(MethodDefinition method, IndentingWriter writer)
        {
            writer.WriteLine(GenerateHeaderLine(method));
            writer.WriteLine("{");
            using (writer.Indent())
            {
                var first = true;
                writer.WriteLine($"// Code Size {method.Body.CodeSize,8} (0x{method.Body.CodeSize:X2})");
                writer.WriteLine($".maxstack  {method.Body.MaxStackSize}");
                foreach (var variable in method.Body.Variables)
                {
                    var line = "";
                    if (first)
                    {
                        first = false;
                        line = ".locals init (";
                    }
                    else
                    {
                        line = "              ";
                    }
                    line += $"{GetTypeName(variable.VariableType)} V_{variable.Index}";
                    writer.WriteLine(line);
                }

                foreach (var instruction in method.Body.Instructions)
                {
                    writer.WriteLine(instruction);
                }
            }
            writer.WriteLine("}");
        }

        private static string GenerateHeaderLine(MethodDefinition method)
        {
            var builder = new StringBuilder();
            builder.Append($".method {GetMemberAccess(method.Attributes)}");

            AppendAttribute(builder, method.Attributes, MethodAttributes.Abstract, nameof(MethodAttributes.Abstract).ToLowerInvariant());
            AppendAttribute(builder, method.Attributes, MethodAttributes.Final, nameof(MethodAttributes.Final).ToLowerInvariant());
            AppendAttribute(builder, method.Attributes, MethodAttributes.UnmanagedExport, nameof(MethodAttributes.UnmanagedExport).ToLowerInvariant());
            AppendAttribute(builder, method.Attributes, MethodAttributes.HideBySig, nameof(MethodAttributes.HideBySig).ToLowerInvariant());
            AppendAttribute(builder, method.Attributes, MethodAttributes.NewSlot, nameof(MethodAttributes.NewSlot).ToLowerInvariant());
            AppendAttribute(builder, method.Attributes, MethodAttributes.PInvokeImpl, nameof(MethodAttributes.PInvokeImpl).ToLowerInvariant());
            AppendAttribute(builder, method.Attributes, MethodAttributes.RTSpecialName, nameof(MethodAttributes.RTSpecialName).ToLowerInvariant());
            AppendAttribute(builder, method.Attributes, MethodAttributes.SpecialName, nameof(MethodAttributes.SpecialName).ToLowerInvariant());
            AppendAttribute(builder, method.Attributes, MethodAttributes.Static, nameof(MethodAttributes.Static).ToLowerInvariant());
            AppendAttribute(builder, method.Attributes, MethodAttributes.Virtual, nameof(MethodAttributes.Virtual).ToLowerInvariant());
            AppendAttribute(builder, method.Attributes, MethodAttributes.CheckAccessOnOverride, "strict");
            AppendAttribute(builder, method.Attributes, MethodAttributes.HasSecurity, nameof(MethodAttributes.HasSecurity).ToLowerInvariant());
            AppendAttribute(builder, method.Attributes, MethodAttributes.RequireSecObject, nameof(MethodAttributes.RequireSecObject).ToLowerInvariant());

            builder.Append(" " + GetTypeName(method.ReturnType));
            builder.Append(" " + method.Name);
            builder.Append("(");
            foreach (var parameter in method.Parameters)
            {
                builder.Append($"{GetTypeName(parameter.ParameterType)} {parameter.Name}");
            }
            builder.Append(")");

            AppendIf(builder, method.IsIL, " cil");
            AppendIf(builder, method.IsManaged, " managed");

            return builder.ToString();
        }

        private static void AppendIf(StringBuilder builder, bool condition, string str)
        {
            if (condition)
            {
                builder.Append(str);
            }
        }

        private static string GetTypeName(TypeReference typeRef)
        {
            if (_cilTypeNames.TryGetValue(typeRef.FullName, out var cilName))
            {
                return cilName;
            }
            return typeRef.FullName;
        }

        private static void AppendAttribute(StringBuilder builder, MethodAttributes attributes, MethodAttributes candidate, string text)
        {
            if ((attributes & candidate) != 0)
            {
                builder.Append(" " + text);
            }
        }

        private static string GetMemberAccess(MethodAttributes attributes)
        {
            if ((attributes & MethodAttributes.Public) != 0)
            {
                return "public";
            }
            else if ((attributes & MethodAttributes.FamORAssem) != 0)
            {
                return "famorassem";
            }
            else if ((attributes & MethodAttributes.FamANDAssem) != 0)
            {
                return "famandassemb";
            }
            else if ((attributes & MethodAttributes.Family) != 0)
            {
                return "family";
            }
            else if ((attributes & MethodAttributes.Assembly) != 0)
            {
                return "assembly";
            }
            else if ((attributes & MethodAttributes.Assembly) != 0)
            {
                return "private";
            }
            else if (attributes == 0)
            {
                return "compilercontrolled";
            }
            return "<<unknown>>";
        }
    }
}
