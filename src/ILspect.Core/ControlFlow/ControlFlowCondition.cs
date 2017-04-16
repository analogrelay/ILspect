using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect.ControlFlow
{
    // SO READY for C# record types :)

    public abstract class ControlFlowCondition
    {
    }

    public class FilterCondtion : ControlFlowCondition
    {
        public override string ToString() => "filter";
    }

    public class FaultCondition : ControlFlowCondition
    {
        public override string ToString() => "fault";
    }

    public class FinallyCondition : ControlFlowCondition
    {
        public override string ToString() => "finally";
    }


    public class BranchCondition : ControlFlowCondition
    {
        public Instruction Branch { get; }

        public BranchCondition(Instruction branch)
        {
            Branch = branch;
        }

        public override string ToString() => Branch.OpCode.ToString();
    }

    public class CatchCondition : ControlFlowCondition
    {
        public TypeReference ExceptionType { get; }

        public CatchCondition(TypeReference exceptionType)
        {
            ExceptionType = exceptionType;
        }

        public override string ToString() => $"catch ({ExceptionType.FullName})";
    }
}
