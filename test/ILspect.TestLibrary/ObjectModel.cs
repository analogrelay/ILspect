using System;

namespace ILspect.TestLibrary
{
    public static class ObjectModel
    {
        public static void Box(MyStruct value)
        {
            Console.WriteLine(value);
        }

        public static int CallVirt(string item)
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

        public static void CastClass(object value)
        {
            Console.WriteLine((string)value);
        }

        public static void Initobj()
        {
            Console.WriteLine(default(MyStruct));
        }

        public static void Isinst(object value)
        {
            Console.WriteLine(value is string);
        }

        public static int Ldelem(int[] items)
        {
            return items[42];
        }

        public static int Ldfld(MyClass value)
        {
            return value.Foo;
        }

        public unsafe static void Ldelema(int[] items)
        {
            fixed (int* ptr = &items[42])
            {
                Console.WriteLine(*ptr);
            }
        }

        public static void Ldlen(int[] value)
        {
            Console.WriteLine(value.Length);
        }

        public unsafe static void Ldarga(int value)
        {
            int* ptr = &value;
            Console.WriteLine(*ptr);
        }

        public unsafe static void Ldflda(MyStruct value)
        {
            int* ptr = &value.Foo;
            Console.WriteLine(*ptr);
        }

        public static void Ldobj<T>(ref T value) where T : class
        {
            Console.WriteLine(value);
        }

        public static void Ldsfld()
        {
            Console.WriteLine(MyStruct.Bar);
        }

        public static void Ldtoken()
        {
            Console.WriteLine(typeof(MyStruct));
        }

        public struct MyStruct
        {
            public static readonly int Bar = 42;
            public int Foo;

            public MyStruct(int foo)
            {
                Foo = foo;
            }
        }

        public class MyClass
        {
            public int Foo;
        }
    }
}