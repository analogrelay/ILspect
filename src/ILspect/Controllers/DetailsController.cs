using Microsoft.AspNetCore.Mvc;
using ILspect.Server.Data;
using ILspect.Server.Services;
using ILspect.Server.ResponseModels;

namespace ILspect.Server.Controllers
{
    [Produces("application/json")]
    public class DetailsController : ControllerBase
    {
        private readonly AssemblyTable _assemblies;
        private readonly Decompiler _decompiler;

        public DetailsController(AssemblyTable assemblies, Decompiler decompiler)
        {
            _assemblies = assemblies;
        }

        [HttpGet]
        [Route("api/assemblies/{id}/{namespaceName}/{typeName}/{memberName}")]
        public IActionResult Get(string id, string namespaceName, string typeName, string memberName)
        {
            MemberEntry member;
            var asm = _assemblies.GetAssemblyOrDefault(id);
            if (asm == null || !asm.TryGetMember(namespaceName, typeName, memberName, out member))
            {
                return NotFound();
            }
            
            var decompiled = _decompiler.DecompileMember(member);

            return Ok(new MemberDetailModel()
            {
                Name = member.Name,
                Kind = member.Kind,
                Body = decompiled.Body
            });
        }
    }
}