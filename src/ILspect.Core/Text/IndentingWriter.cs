using System;
using System.IO;
using System.Text;

namespace ILspect.Text
{
    public class IndentingWriter : TextWriter
    {
        private int _newLineProgress = 0;

        public int IndentLevel { get; private set;  }
        public int IndentAmount { get; }
        public char IndentCharacter { get; }
        public TextWriter Output { get; }

        public override Encoding Encoding => Output.Encoding;

        public IndentingWriter(TextWriter output) : this(output, 2, ' ') { }

        public IndentingWriter(TextWriter output, int indentAmount, char indentCharacter)
        {
            IndentLevel = 0;
            IndentAmount = indentAmount;
            IndentCharacter = indentCharacter;
            Output = output;
        }

        public IDisposable Indent()
        {
            IndentLevel += 1;
            return Disposable.Create(() => Unindent());
        }

        private void Unindent()
        {
            if (IndentLevel > 0)
            {
                IndentLevel -= 1;
            }
        }

        public override void Write(char value)
        {
            if (_newLineProgress == Environment.NewLine.Length)
            {
                // We've hit a new line
                StartLine();
            }

            if (value == Environment.NewLine[_newLineProgress])
            {
                _newLineProgress += 1;
            }
            else
            {
                _newLineProgress = 0;
            }

            Output.Write(value);
        }

        private void StartLine()
        {
            var quantity = IndentLevel * IndentAmount;
            if (quantity > 0)
            {
                Output.Write(new string(IndentCharacter, quantity));
            }
            _newLineProgress = 0;
        }
    }
}
