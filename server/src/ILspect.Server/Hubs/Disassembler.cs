using Microsoft.AspNetCore.SignalR;

namespace ILspect.Server.Hubs
{
    public class Disassembler : Hub
    {
        public string Echo(string message)
        {
            return "You said: " + message;
        }
    }
}