using System;
using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.Syntax
{
    public class MethodVariables
    {
        private List<Temporary> _temporaries = new List<Temporary>();

        public IReadOnlyList<ParameterDefinition> Parameters { get; }
        public IReadOnlyList<VariableDefinition> Locals { get; }
        public IReadOnlyList<Temporary> Temporaries => _temporaries.AsReadOnly();

        public MethodVariables()
            : this(Enumerable.Empty<ParameterDefinition>(), Enumerable.Empty<VariableDefinition>()) { }

        public MethodVariables(IEnumerable<ParameterDefinition> parameters, IEnumerable<VariableDefinition> locals)
        {
            Parameters = parameters.ToList().AsReadOnly();
            Locals = locals.ToList().AsReadOnly();
        }

        public MethodVariables(MethodDefinition method) : this(method.Parameters, method.Body.Variables) { }

        public ParameterReference GetParameter(int index)
        {
            if (index > Parameters.Count || index < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(index));
            }
            return Parameters[index];
        }

        public VariableReference GetLocal(int index)
        {
            if (index > Locals.Count || index < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(index));
            }
            return Locals[index];
        }

        public Temporary CreateTemporary()
        {
            var temporary = new Temporary(_temporaries.Count);
            _temporaries.Add(temporary);
            return temporary;
        }
    }
}
