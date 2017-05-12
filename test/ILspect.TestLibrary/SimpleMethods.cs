using System;

namespace ILspect.TestLibrary
{
    public static class SimpleMethods
    {
        public static int BinExprs(int x, int y)
        {
            Console.WriteLine("Add: " + (x + y));
            Console.WriteLine("And: " + (x & y));
            Console.WriteLine("Div: " + (x / y));

            return 0;
        }

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

        public static void ParamArray(params string[] args)
        {
            Console.WriteLine(args);
        }

        public static void Compare(int x, int y)
        {
            Console.WriteLine("Eq: " + (x == y));
            Console.WriteLine("Ne: " + (x != y));
            Console.WriteLine("Gt: " + (x > y));
            Console.WriteLine("Lt: " + (x < y));
            Console.WriteLine("Ge: " + (x >= y));
            Console.WriteLine("Le: " + (x <= y));
        }

        public static void Convert(int x, long y)
        {
            Console.WriteLine("int8" + (sbyte)x);
            Console.WriteLine("int16" + (short)x);
            Console.WriteLine("int32" + (int)y);
            Console.WriteLine("int64" + (long)x);
            Console.WriteLine("float32" + (float)x);
            Console.WriteLine("float64" + (double)x);
            Console.WriteLine("uint8" + (byte)x);
            Console.WriteLine("uint16" + (ushort)x);
            Console.WriteLine("uint32" + (uint)y);
            Console.WriteLine("uint64" + (ulong)x);

            // C# doesn't emit the conv.i or conv.u opcodes for these,
            // rather it uses op_Explicit on (U)IntPtr.
            // Console.WriteLine("native int" + (IntPtr)x);
            // Console.WriteLine("native unsigned int" + (UIntPtr)x);
        }
        public static int ArrayElement(int[] items)
        {
            return items[42];
        }

#if NET46
        public static void ArgList(__arglist)
        {
            var args = new ArgIterator(__arglist);
        }
#endif
    }
}
