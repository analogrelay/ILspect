namespace ILspect.TestLibrary
{
    public static class SimpleMethods
    {
        public static int Add(int x, int y)
        {
            return x + y;
        }

        public static int CheckedAdd(int x, int y)
        {
            checked
            {
                return x + y;
            }
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

        public static int Call(string item)
        {
            return item.Length;
        }

        public static string CallWithArgs(string item)
        {
            return item.Substring(1, 1024);
        }

        public static string CallStatic(string item)
        {
            return string.Format("Foo {0}", item);
        }

        public static int ArrayElement(int[] items)
        {
            return items[42];
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
