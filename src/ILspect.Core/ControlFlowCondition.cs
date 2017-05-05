using System;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace ILspect
{
    // SO READY for C# record types :)
    public abstract class Condition
    {
    }

    public class FilterCondtion : Condition
    {
        public override string ToString() => "filter";
    }

    public class FaultCondition : Condition
    {
        public override string ToString() => "fault";
    }

    public class FinallyCondition : Condition
    {
        public override string ToString() => "finally";
    }


    public class BranchCondition<TBranch> : Condition
    {
        public TBranch Branch { get; }

        public BranchCondition(TBranch branch)
        {
            Branch = branch;
        }

        public override string ToString()
        {
            // Not ideal...
            if (((object)Branch) is Instruction i)
            {
                return i.OpCode.ToString();
            }
            return Branch.ToString();
        }
    }

    public class CatchCondition : Condition
    {
        public TypeReference ExceptionType { get; }

        public CatchCondition(TypeReference exceptionType)
        {
            ExceptionType = exceptionType;
        }

        public override string ToString() => $"catch ({ExceptionType.FullName})";
    }
}
