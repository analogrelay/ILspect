namespace ILspect.Syntax
{
    public class TemporaryList
    {
        private int _temporaryCount = 0;

        public int Count => _temporaryCount;

        public int AddTemporary()
        {
            var temp = _temporaryCount;
            _temporaryCount += 1;
            return temp;
        }
    }
}
