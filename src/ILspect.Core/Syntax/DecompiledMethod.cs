using Mono.Cecil;

namespace ILspect.Syntax
{
    public class DecompiledMethod
    {
        private int _temporaryCount = 0;

        public MethodDefinition Definition { get; }
        public int TemporaryCount => _temporaryCount;

        public DecompiledMethod(MethodDefinition definition)
        {
            Definition = definition;
        }

        public int NextTemporary()
        {
            var temp = _temporaryCount;
            _temporaryCount += 1;
            return temp;
        }
    }
}