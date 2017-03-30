using System;
using System.Linq;
using System.Reflection;
using ILspect.CommandLine.Commands;
using Microsoft.Extensions.CommandLineUtils;

namespace ILspect.CommandLine
{
    internal class Program
    {
        internal static readonly Assembly Assembly = typeof(Program).GetTypeInfo().Assembly;
        internal static readonly string Name = Assembly.GetName().Name;
        internal static readonly string Version = Assembly.GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion;
        static int Main(string[] args)
        {
            if (args.Any(a => a == "--debug"))
            {
                args = args.Where(a => a != "--debug").ToArray();
                Console.WriteLine($"Waiting for debugger to attach. Process ID: {System.Diagnostics.Process.GetCurrentProcess().Id}");
                Console.WriteLine("Press ENTER to continue.");
                Console.ReadLine();
            }

            var app = new CommandLineApplication();
            app.Name = Name;
            app.FullName = "ILspect Command-Line Interface";
            app.HelpOption("-h|-?|--help");
            app.VersionOption("-v|--version", Program.Version);

            ListCommand.Register(app);
            GraphCommand.Register(app);
            DisassembleCommand.Register(app);
            SyntaxCommand.Register(app);

            CommandHelpers.RegisterHelpCommand(app);

            app.OnExecute(() =>
            {
                app.ShowHelp();
                return 0;
            });

            try
            {
                return app.Execute(args);
            }
            catch (Exception ex)
            {
                CommandHelpers.Error(ex.Message);
#if DEBUG
                throw;
#endif
            }
        }
    }
}
