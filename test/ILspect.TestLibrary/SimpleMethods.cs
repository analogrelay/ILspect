namespace ILspect.TestLibrary
{
    public static class SimpleMethods
    {
        public static int Add(int x, int y)
        {
            return x + y;
        }

        public static int Abs(int x)
        {
            if (x < 0)
            {
                return -x;
            }
            else
            {
                return x;
            }
        }
    }
}
