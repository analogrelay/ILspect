using System;

namespace ILspect.TestLibrary
{
    public static class Calls
    {
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
    }
}
