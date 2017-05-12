
using System;

namespace ILspect.TestLibrary
{
    public static class ControlFlow
    {
        public static void If(string[] items)
        {
            if(items.Length > 0)
            {
                Console.WriteLine("Has Items!");
            }
            else
            {
                Console.WriteLine("Does not have items!");
            }
        }

        public static void NestedIf(string[] items)
        {
            if(items.Length > 0)
            {
                if (items.Rank > 0)
                {
                    Console.WriteLine("Items > 0 && Rank > 0");
                }
                else
                {
                    Console.WriteLine("Items > 0 && Rank <= 0");
                }
            }
            else
            {
                if (items.Rank > 0)
                {
                    Console.WriteLine("Items <= 0 && Rank > 0");
                }
                else
                {
                    Console.WriteLine("Items <= 0 && Rank <= 0");
                }
            }
        }

        public static void ForLoop(string[] items)
        {
            var length = 0;
            for (int i = 0; i < items.Length; i++)
            {
                length += items[i].Length;
            }
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
