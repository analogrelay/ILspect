using System;
using System.Collections.Generic;
using System.Text;
using Mono.Cecil;

namespace ILspect.Services
{
    public class DecompilerVisitor : MetadataVisitor
    {
        public StringBuilder Decompilation { get; }

        public DecompilerVisitor()
        {
            Decompilation = new StringBuilder();
        }

        public override void Visit(MethodDefinition method)
        {
            var attributes = CollectAttributes(method.Attributes);

            Decompilation.AppendLine($".method {string.Join(" ", attributes)}");
            Decompilation.AppendLine($"    {RenderType(method.ReturnType)} {method.Name} (");
            foreach (var parameter in method.Parameters)
            {
                Decompilation.AppendLine($"        {RenderType(parameter.ParameterType)} {parameter.Name}");
            }
            Decompilation.AppendLine($"    ) {string.Join(" ", CollectAttributes(method.ImplAttributes))}");
            Decompilation.AppendLine("{");
            Decompilation.AppendLine("}");
        }

        private string RenderType(TypeReference returnType)
        {
            return returnType.FullName;
        }

        private IEnumerable<string> CollectAttributes(MethodImplAttributes attributes)
        {
            if ((attributes & MethodImplAttributes.IL) == MethodImplAttributes.IL)
            {
                yield return "il";
            }
            if ((attributes & MethodImplAttributes.Native) == MethodImplAttributes.Native)
            {
                yield return "native";
            }
            if ((attributes & MethodImplAttributes.OPTIL) == MethodImplAttributes.OPTIL)
            {
                yield return "optil";
            }
            if ((attributes & MethodImplAttributes.Runtime) == MethodImplAttributes.Runtime)
            {
                yield return "runtime";
            }
            if ((attributes & MethodImplAttributes.Unmanaged) == MethodImplAttributes.Unmanaged)
            {
                yield return "unmanaged";
            }
            if ((attributes & MethodImplAttributes.Managed) == MethodImplAttributes.Managed)
            {
                yield return "managed";
            }
            if ((attributes & MethodImplAttributes.ForwardRef) == MethodImplAttributes.ForwardRef)
            {
                yield return "forwardref";
            }
            if ((attributes & MethodImplAttributes.PreserveSig) == MethodImplAttributes.PreserveSig)
            {
                yield return "preservesig";
            }
            if ((attributes & MethodImplAttributes.InternalCall) == MethodImplAttributes.InternalCall)
            {
                yield return "internalcall";
            }
            if ((attributes & MethodImplAttributes.Synchronized) == MethodImplAttributes.Synchronized)
            {
                yield return "synchronized";
            }
            if ((attributes & MethodImplAttributes.NoOptimization) == MethodImplAttributes.NoOptimization)
            {
                yield return "nooptimization";
            }
            if ((attributes & MethodImplAttributes.NoInlining) == MethodImplAttributes.NoInlining)
            {
                yield return "noinlining";
            }
        }

        private IEnumerable<string> CollectAttributes(MethodAttributes attributes)
        {
            if ((attributes & MethodAttributes.CompilerControlled) == MethodAttributes.CompilerControlled)
            {
                yield return "compilercontrolled";
            }
            if ((attributes & MethodAttributes.Private) == MethodAttributes.Private)
            {
                yield return "private";
            }
            if ((attributes & MethodAttributes.FamANDAssem) == MethodAttributes.FamANDAssem)
            {
                yield return "famandassem";
            }
            if ((attributes & MethodAttributes.Assembly) == MethodAttributes.Assembly)
            {
                yield return "assembly";
            }
            if ((attributes & MethodAttributes.Family) == MethodAttributes.Family)
            {
                yield return "family";
            }
            if ((attributes & MethodAttributes.FamORAssem) == MethodAttributes.FamORAssem)
            {
                yield return "famorassem";
            }
            if ((attributes & MethodAttributes.Public) == MethodAttributes.Public)
            {
                yield return "public";
            }
            if ((attributes & MethodAttributes.Static) == MethodAttributes.Static)
            {
                yield return "static";
            }
            if ((attributes & MethodAttributes.Final) == MethodAttributes.Final)
            {
                yield return "final";
            }
            if ((attributes & MethodAttributes.Virtual) == MethodAttributes.Virtual)
            {
                yield return "virtual";
            }
            if ((attributes & MethodAttributes.HideBySig) == MethodAttributes.HideBySig)
            {
                yield return "hidebysig";
            }
            if ((attributes & MethodAttributes.ReuseSlot) == MethodAttributes.ReuseSlot)
            {
                yield return "reuseslot";
            }
            if ((attributes & MethodAttributes.NewSlot) == MethodAttributes.NewSlot)
            {
                yield return "newslot";
            }
            if ((attributes & MethodAttributes.CheckAccessOnOverride) == MethodAttributes.CheckAccessOnOverride)
            {
                yield return "checkaccessonoverride";
            }
            if ((attributes & MethodAttributes.Abstract) == MethodAttributes.Abstract)
            {
                yield return "abstract";
            }
            if ((attributes & MethodAttributes.SpecialName) == MethodAttributes.SpecialName)
            {
                yield return "specialname";
            }
            if ((attributes & MethodAttributes.PInvokeImpl) == MethodAttributes.PInvokeImpl)
            {
                yield return "pinvokeimpl";
            }
            if ((attributes & MethodAttributes.UnmanagedExport) == MethodAttributes.UnmanagedExport)
            {
                yield return "unmanagedexport";
            }
            if ((attributes & MethodAttributes.RTSpecialName) == MethodAttributes.RTSpecialName)
            {
                yield return "rtspecialname";
            }
            if ((attributes & MethodAttributes.HasSecurity) == MethodAttributes.HasSecurity)
            {
                yield return "hassecurity";
            }
            if ((attributes & MethodAttributes.RequireSecObject) == MethodAttributes.RequireSecObject)
            {
                yield return "requiresecobject";
            }
        }
    }
}