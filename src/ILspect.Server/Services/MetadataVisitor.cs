using Mono.Cecil;

namespace ILspect.Server.Services
{
    public abstract class MetadataVisitor
    {
        public virtual void Visit(MethodDefinition method) { }
        public virtual void Visit(FieldDefinition field) { }
        public virtual void Visit(PropertyDefinition property) { }
        public virtual void Visit(EventDefinition @event) { }
        public virtual void Visit(TypeDefinition type) { }
    }

    public static class MetadataVisitorExtensions
    {
        public static void Accept(this IMemberDefinition self, MetadataVisitor visitor)
        {
            var method = self as MethodDefinition;
            if (method != null)
            {
                visitor.Visit(method);
                return;
            }

            var field = self as FieldDefinition;
            if (field != null)
            {
                visitor.Visit(field);
                return;
            }

            var property = self as PropertyDefinition;
            if (property != null)
            {
                visitor.Visit(property);
                return;
            }

            var evt = self as EventDefinition;
            if (evt != null)
            {
                visitor.Visit(evt);
                return;
            }

            var typ = self as TypeDefinition;
            if (typ != null)
            {
                visitor.Visit(typ);
            }
        }
    }
}