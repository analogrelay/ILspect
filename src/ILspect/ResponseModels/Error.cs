using System;

namespace ILspect.ResponseModels
{
    public class Error
    {
        public string Type { get; }
        public string Message { get; }
        public string Details { get; }
        
        public Error(string type, string message, string details)
        {
            Type = type;
            Message = message;
            Details = details;
        }
        
        public static Error FromException(Exception ex)
        {
            return new Error(
                ex.GetType().Name,
                ex.Message,
                ex.ToString());
        }
    }
}