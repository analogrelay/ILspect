using System;

namespace ILspect
{
    internal class Disposable
    {
        internal static IDisposable Create(Action action)
        {
            return new ActionDisposable(action);
        }

        internal class ActionDisposable : IDisposable
        {
            private Action _action;

            public ActionDisposable(Action action)
            {
                _action = action;
            }

            public void Dispose()
            {
                _action?.Invoke();
            }
        }
    }
}