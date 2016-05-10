using System.Threading;
using ICSharpCode.Decompiler;
using ICSharpCode.Decompiler.Ast;
using ICSharpCode.Decompiler.Disassembler;
using ILspect.Data;
using ILspect.ResponseModels;
using Microsoft.AspNetCore.Mvc;
using Mono.Cecil;

namespace ILspect.Controllers
{
    public class DisassemblyController : ControllerBase
    {
        private readonly DataStore _data;

        public DisassemblyController(DataStore data)
        {
            _data = data;
        }

        [HttpGet]
        [Route("api/disassembly/{assemblyId}/{namespaceName}/{typeName}")]
        public IActionResult DisassembleType(string assemblyId, string namespaceName, string typeName)
        {
            var member = _data.GetType(assemblyId, namespaceName, typeName);
            if (member == null)
            {
                return NotFound();
            }
            return DisassembleMember(member);
        }

        [HttpGet]
        [Route("api/disassembly/{assemblyId}/{namespaceName}/{typeName}/{memberName}")]
        public IActionResult DisassembleMember(string assemblyId, string namespaceName, string typeName, string memberName)
        {
            var member = _data.GetMember(assemblyId, namespaceName, typeName, memberName);
            if (member == null)
            {
                return NotFound();
            }

            return DisassembleMember(member);
        }

        private IActionResult DisassembleMember(MemberEntity member)
        {
            var output = new PlainTextOutput();
            var settings = new DecompilerSettings();
            settings.AsyncAwait = true;
            settings.AnonymousMethods = true;
            settings.AutomaticEvents = true;
            settings.AutomaticProperties = true;
            settings.YieldReturn = true;
            settings.ObjectOrCollectionInitializers = true;
            settings.MakeAssignmentExpressions = true;
            settings.LockStatement = true;
            settings.ForEachStatement = true;
            if(member.Kind != MemberKind.Type)
            {
                settings.UsingDeclarations = false;
            }
            var builder = new AstBuilder(
                new DecompilerContext(member.Type.Definition.Module)
                {
                    Settings = settings,
                    CurrentType = member.Type.Definition
                });
            AddMember(builder, member);
            builder.GenerateCode(output);
            var disassembly = output.ToString();

            return Ok(ApiResponse.Create(string.Empty, disassembly));
        }

        private void AddMember(AstBuilder builder, MemberEntity member)
        {
            switch (member.Kind)
            {
                case MemberKind.Field:
                    builder.AddField((FieldDefinition)member.Definition);
                    return;
                case MemberKind.Method:
                    builder.AddMethod((MethodDefinition)member.Definition);
                    return;
                case MemberKind.Property:
                    builder.AddProperty((PropertyDefinition)member.Definition);
                    return;
                case MemberKind.Event:
                    builder.AddEvent((EventDefinition)member.Definition);
                    return;
                case MemberKind.Type:
                    builder.AddType((TypeDefinition)member.Definition);
                    return;
                default:
                    return;
            }
        }
    }
}
