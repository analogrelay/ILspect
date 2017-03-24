using Microsoft.Extensions.CommandLineUtils;

namespace ILspect.CommandLine.Commands
{
    public static class ListCommand
    {
        private static readonly string Name = "list";
        internal static void Register(CommandLineApplication app)
        {
            app.Command(Name, cmd =>
            {
                cmd.FullName = "ILspect.CommandLine list command";
                cmd.Description = "Lists metadata from the provided assembly";

                ListTypesCommand.Register(cmd);
                ListNamespacesCommand.Register(cmd);
                ListMembersCommand.Register(cmd);
                CommandHelpers.RegisterHelpCommand(cmd);

                cmd.OnExecute(() =>
                {
                    cmd.ShowHelp();
                    return 0;
                });
            });
        }
    }
}