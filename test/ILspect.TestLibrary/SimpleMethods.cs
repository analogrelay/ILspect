using System;

namespace ILspect.TestLibrary
{
    public static class SimpleMethods
    {
        public static void BinExprs(int x, int y)
        {
            Console.WriteLine("Add: " + (x + y));
            Console.WriteLine("And: " + (x & y));
            Console.WriteLine("Div: " + (x / y));
            Console.WriteLine("Mul: " + (x * y));
            Console.WriteLine("BitOr: " + (x | y));
            Console.WriteLine("Rem: " + (x % y));
            Console.WriteLine("Shl: " + (x << 4));
            Console.WriteLine("Shr: " + (x >> 4));
            Console.WriteLine("Sub: " + (x - 4));
            Console.WriteLine("BitXor: " + (x ^ 4));
        }

        public static void UnsignedBinExprs(uint x, uint y)
        {
            Console.WriteLine("Add: " + (x + y));
            Console.WriteLine("And: " + (x & y));
            Console.WriteLine("Div: " + (x / y));
            Console.WriteLine("Mul: " + (x * y));
            Console.WriteLine("BitOr: " + (x | y));
            Console.WriteLine("Rem: " + (x % y));
            Console.WriteLine("Shr: " + (x >> 4));
            Console.WriteLine("Sub: " + (x - 4));
            Console.WriteLine("BitXor: " + (x ^ 4));
        }

        public static void UnExprs(int x, bool y)
        {
            Console.WriteLine("Neg: " + -x);
            Console.WriteLine("Not: " + !y);
            Console.WriteLine("BitNot: " + ~x);
        }

        public static void StoreArg(int foo)
        {
            foo = foo + 42;
            Console.WriteLine("foo: " + foo);
        }

        public static void RefParam(ref int foo)
        {
            foo = foo + 42;
        }

        public static void OutParam(out int foo)
        {
            foo = 42;
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

        public static void Null()
        {
            new Version(null);
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

        public static void Constants()
        {
            Console.WriteLine("i4:" + 42);
            Console.WriteLine("i8:" + 42L);
            Console.WriteLine("r4:" + 3.14f);
            Console.WriteLine("r8:" + 3.14);
        }

        public static void Args(string a, string b, string c, string d, string e, string f, string g, string h, string i, string j)
        {
            Console.WriteLine("a: " + a);
            Console.WriteLine("b: " + b);
            Console.WriteLine("c: " + c);
            Console.WriteLine("d: " + d);
            Console.WriteLine("e: " + e);
            Console.WriteLine("f: " + f);
            Console.WriteLine("g: " + g);
            Console.WriteLine("h: " + h);
            Console.WriteLine("i: " + i);
            Console.WriteLine("j: " + j);
        }

#if NET46
        public static void ArgList(__arglist)
        {
            var args = new ArgIterator(__arglist);
        }
#endif
    }
}
