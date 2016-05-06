using System;
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
    [Produces("application/json")]
    public class DetailsController : ControllerBase
    {
        private readonly AssemblyTable _assemblies;

        public DetailsController(AssemblyTable assemblies)
        {
            _assemblies = assemblies;
        }

        [HttpGet]
        [Route("api/assemblies/{assemblyId}/{namespaceName}/{typeName}/{memberName}")]
        public IActionResult Get(string assemblyId, string namespaceName, string typeName, string memberName)
        {
            namespaceName = string.Equals(namespaceName, Constants.DefaultNamespace, StringComparison.Ordinal) ? "" : namespaceName;

            MemberEntity member;
            var asm = _assemblies.GetAssembly(Guid.ParseExact(assemblyId, "N"));
            if (asm == null || !asm.TryGetMember(namespaceName, typeName, memberName, out member))
            {
                return NotFound();
            }

            var output = new PlainTextOutput();
            var disassembler = new ReflectionDisassembler(output, detectControlStructure: false, cancellationToken: CancellationToken.None);
            DisassembleMember(disassembler, member);

            return Ok(new MemberDetailModel()
            {
                Name = member.Name,
                Kind = member.Kind,
                Body = output.ToString()
            });
        }

        private void DisassembleMember(ReflectionDisassembler disassembler, MemberEntity member)
        {
            switch (member.Kind)
            {
                case MemberKind.Field:
                    disassembler.DisassembleField((FieldDefinition)member.Definition);
                    return;
                case MemberKind.Method:
                    disassembler.DisassembleMethod((MethodDefinition)member.Definition);
                    return;
                case MemberKind.Property:
                    disassembler.DisassembleProperty((PropertyDefinition)member.Definition);
                    return;
                case MemberKind.Event:
                    disassembler.DisassembleEvent((EventDefinition)member.Definition);
                    return;
                case MemberKind.Type:
                    disassembler.DisassembleType((TypeDefinition)member.Definition);
                    return;
                default:
                    return;
            }
        }
    }
}