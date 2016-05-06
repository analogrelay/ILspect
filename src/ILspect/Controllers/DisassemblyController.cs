using System.Threading;
using ICSharpCode.Decompiler;
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
        [Route("api/disassembly/{assemblyId}/{namespaceName}/{typeName}/{memberName}")]
        public IActionResult DisassembleMember(string assemblyId, string namespaceName, string typeName, string memberName)
        {
            var member = _data.GetMember(assemblyId, namespaceName, typeName, memberName);
            if (member == null)
            {
                return NotFound();
            }

            var output = new PlainTextOutput();
            var disassembler = new ReflectionDisassembler(output, detectControlStructure: false, cancellationToken: CancellationToken.None);
            DisassembleMember(disassembler, member);
            var disassembly = output.ToString();

            return Ok(ApiResponse.Create(string.Empty, disassembly));
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
