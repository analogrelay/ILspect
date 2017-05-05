using System;

namespace ILspect.TestLibrary
{
    public static class ExceptionHandlers
    {
        public static void TryFinally()
        {
            try
            {
                Console.WriteLine("Try");
            }
            finally
            {
                Console.WriteLine("Finally");
            }
        }

        public static void TryCatchFinally()
        {
            try
            {
                Console.WriteLine("Try");
            }
            catch
            {
                Console.WriteLine("Catch");
            }
            finally
            {
                Console.WriteLine("Finally");
            }
        }

        public static void TryCatchTypeFinally()
        {
            try
            {
                Console.WriteLine("Try");
            }
            catch (InvalidOperationException)
            {
                Console.WriteLine("Catch");
            }
            finally
            {
                Console.WriteLine("Finally");
            }
        }

        public static void TryCatchFilterFinally()
        {
            try
            {
                Console.WriteLine("Try");
            }
            catch (InvalidOperationException iex) when (iex.Message.Length > 0)
            {
                Console.WriteLine("Catch");
            }
            finally
            {
                Console.WriteLine("Finally");
            }
        }
    }
}