using System;
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
            var app = new CommandLineApplication();
            app.Name = Program.Name;
            app.FullName = "ILspect Command-Line Interface";
            app.HelpOption("-h|-?|--help");
            app.VersionOption("-v|--version", Program.Version);

            ListCommand.Register(app);
            GraphCommand.Register(app);

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
