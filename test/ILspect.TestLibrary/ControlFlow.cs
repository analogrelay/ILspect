
using System;

namespace ILspect.TestLibrary
{
    public static class ControlFlow
    {
        public static void ForLoop(string[] items)
        {
            var length = 0;
            for (int i = 0; i < items.Length; i++)
            {
                length += items[i].Length;
            }
        }

        public static void ParamArray(params string[] args)
        {
            Console.WriteLine(args);
        }

        public static void WhileLoop()
        {
            var i = 0;
            while (i < 10)
            {
                i++;
            }
        }

        public static void DoWhileLoop()
        {
            var i = 0;
            do
            {
                i++;
            } while (i < 10);
        }
    }
}
