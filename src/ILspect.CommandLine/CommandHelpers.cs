using System;
using Microsoft.Extensions.CommandLineUtils;

namespace ILspect.CommandLine
{
    internal static class CommandHelpers
    {
        public static int Error(string message)
        {
            var oldColor = Console.ForegroundColor;
            Console.ForegroundColor = ConsoleColor.Red;
            Console.Error.Write("error: ");
            Console.ForegroundColor = ConsoleColor.White;
            Console.Error.WriteLine(message);
            Console.ForegroundColor = oldColor;
            return 1;
        }

        internal static void RegisterHelpCommand(CommandLineApplication app)
        {
            app.Command("help", cmd =>
            {
                cmd.Description = "Get help information for commands";

                var commandArgument = cmd.Argument("<COMMAND>", "Command to get help for");

                cmd.OnExecute(() =>
                {
                    app.ShowHelp(commandArgument.Value);
                    return 0;
                });
            });
        }
    }
}