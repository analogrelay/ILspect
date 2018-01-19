using System;
using System.IO;
using System.Threading;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ILspect.Server
{
    internal class JsonConsoleLoggerProvider : ILoggerProvider
    {
        public ILogger CreateLogger(string categoryName)
        {
            return new Logger(categoryName);
        }

        public void Dispose()
        {
        }

        private class Logger : ILogger
        {
            private static long _nextId = 0;
            private static readonly JsonSerializer _serializer = new JsonSerializer()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            private string _category;

            public Logger(string category)
            {
                _category = category;
            }

            public IDisposable BeginScope<TState>(TState state)
            {
                var id = Interlocked.Increment(ref _nextId);
                WritePayload(new
                {
                    category = _category,
                    beginScope = new
                    {
                        id,
                        state
                    }
                });
                return new Scope(_category, id);
            }

            public bool IsEnabled(LogLevel logLevel)
            {
                return true;
            }

            public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
            {
                WritePayload(new
                {
                    category = _category,
                    log = new
                    {
                        logLevel,
                        eventId,
                        state,
                        exception,
                        formatted = formatter(state, exception)
                    }
                });
            }

            private static void WritePayload(object payload)
            {
                using (var writer = new StringWriter())
                {
                    using (var jsonWriter = new JsonTextWriter(writer))
                    {
                        _serializer.Serialize(jsonWriter, payload);
                    }
                    writer.Flush();
                    Console.WriteLine(writer.ToString());
                }
            }

            private class Scope : IDisposable
            {
                private readonly string _category;
                private long _id;

                public Scope(string category, long id)
                {
                    _category = category;
                    _id = id;
                }

                public void Dispose()
                {
                    WritePayload(new
                    {
                        category = _category,
                        endScope = _id
                    });
                }
            }
        }
    }
}
