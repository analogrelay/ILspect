using System;
using System.Collections.Generic;
using System.Linq;
using ILspect.Data;
using ILspect.ResponseModels;
using Microsoft.AspNetCore.Mvc;

namespace ILspect.Controllers
{
    [Produces("application/json")]
    public class ObjectsController : ControllerBase
    {
        private readonly DataStore _data;
        private readonly ModelBuilder _builder;

        public ObjectsController(ModelBuilder builder, DataStore data)
        {
            _builder = builder;
            _data = data;
        }

        [HttpPut]
        [Route("api/assemblies")]
        public IEnumerable<ApiResponse<AssemblyModel>> Put([FromBody] string[] paths)
        {
            return paths.Select(path =>
            {
                try
                {
                    var entry = _data.AddAssembly(path);
                    return ApiResponse.Create(path, _builder.Build(entry));
                }
                catch (Exception ex)
                {
                    return ApiResponse.Create<AssemblyModel>(path, ex);
                }
            });
        }

        [HttpGet]
        [Route("api/assemblies")]
        public IActionResult GetAllAssemblies() =>
            Ok(ApiResponse.Create("", _data.GetAllAssemblies().Select(a => _builder.Build(a))));

        [HttpGet]
        [Route("api/assemblies/{id}")]
        public IActionResult GetAssembly(string id) => GetObject(_data.GetAssembly(id), _builder.Build);

        [HttpGet]
        [Route("api/assemblies/{assemblyId}/{namespaceName}")]
        public IActionResult GetNamespace(string assemblyId, string namespaceName) =>
            GetObject(_data.GetNamespace(assemblyId, namespaceName), _builder.Build);


        [HttpGet]
        [Route("api/assemblies/{assemblyId}/{namespaceName}/{typeName}")]
        public IActionResult GetType(string assemblyId, string namespaceName, string typeName) =>
            GetObject(_data.GetType(assemblyId, namespaceName, typeName), _builder.Build);

        [HttpGet]
        [Route("api/assemblies/{assemblyId}/{namespaceName}/{typeName}/{memberName}")]
        public IActionResult GetMember(string assemblyId, string namespaceName, string typeName, string memberName)
            => GetObject(_data.GetMember(assemblyId, namespaceName, typeName, memberName), _builder.Build);

        private IActionResult GetObject<T, R>(T entity, Func<T, R> builder) where T : class where R : ModelBase
        {
            if (entity == null)
            {
                return NotFound();
            }
            else
            {
                var response = builder(entity);
                return Ok(ApiResponse.Create(response.Url, response));
            }
        }
    }
}