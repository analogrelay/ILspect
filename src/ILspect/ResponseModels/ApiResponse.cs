using System;

namespace ILspect.ResponseModels
{
    public static class ApiResponse
    {
        public static ApiResponse<T> Create<T>(string id, T result)
        {
            return new ApiResponse<T>(
                id: id,
                success: true,
                error: null,
                result: result);
        }

        public static ApiResponse<T> Create<T>(string id, Exception ex)
        {
            return new ApiResponse<T>(
                id: id,
                success: false,
                error: Error.FromException(ex),
                result: default(T));
        }
        
        public static ApiResponse<T> Create<T>(string id, Error err)
        {
            return new ApiResponse<T>(
                id: id,
                success: false,
                error: err,
                result: default(T));
        }
    }
    
    public class ApiResponse<T> 
    {
        public string Id { get; }
        public bool Success { get; }
        public Error Error { get; }
        public T Result { get; }

        internal ApiResponse(string id, bool success, Error error, T result)
        {
            Id = id;
            Success = success;
            Error = error;
            Result = result;
        }
    }
}