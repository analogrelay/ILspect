using System;

namespace ILspect.TestLibrary
{
    public unsafe static class UnsafeCode
    {
        public static void LoadIndirect(int* value)
        {
            Console.WriteLine(*value);
        } 

        public static void LoadLocalAddress()
        {
            int value = 42;
            LoadIndirect(&value);
        }

        public static void Stackalloc()
        {
            byte* value = stackalloc byte[10];
            Console.WriteLine(*value);
        }
    }
}
