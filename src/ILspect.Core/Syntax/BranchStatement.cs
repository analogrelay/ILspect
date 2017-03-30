namespace ILspect.Syntax
{
    internal class BranchStatement : Statement
    {
        public SyntaxNode Value { get; }
        public bool? Condition { get; }
        public string Target { get; }

        public BranchStatement(string target) : this(null, null, target) { }

        public BranchStatement(SyntaxNode value, bool? condition, string target)
        {
            Value = value;
            Condition = condition;
            Target = target;
        }

        public override string ToString()
        {
            if (Condition == null)
            {
                return $"goto {Target}";
            }
            else
            {
                return $"if ({Value} == {Condition}) goto {Target}";
            }
        }
    }
}