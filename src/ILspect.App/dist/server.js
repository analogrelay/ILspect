System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MemberKind;
    function memberIsType(m) {
        return m.kind == MemberKind.Type;
    }
    exports_1("memberIsType", memberIsType);
    return {
        setters:[],
        execute: function() {
            (function (MemberKind) {
                MemberKind[MemberKind["Field"] = 0] = "Field";
                MemberKind[MemberKind["Method"] = 1] = "Method";
                MemberKind[MemberKind["Property"] = 2] = "Property";
                MemberKind[MemberKind["Event"] = 3] = "Event";
                MemberKind[MemberKind["Type"] = 4] = "Type";
            })(MemberKind || (MemberKind = {}));
            exports_1("MemberKind", MemberKind);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBMkNBLHNCQUE2QixDQUFjO1FBQ3ZDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDckMsQ0FBQztJQUZELHVDQUVDLENBQUE7Ozs7WUFqQkQsV0FBWSxVQUFVO2dCQUVsQiw2Q0FBSyxDQUFBO2dCQUNMLCtDQUFNLENBQUE7Z0JBQ04sbURBQVEsQ0FBQTtnQkFDUiw2Q0FBSyxDQUFBO2dCQUNMLDJDQUFJLENBQUE7WUFDUixDQUFDLEVBUFcsVUFBVSxLQUFWLFVBQVUsUUFPckI7Z0RBQUEiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBBcGlFcnJvciB7XHJcbiAgICB0eXBlPzogc3RyaW5nXHJcbiAgICBtZXNzYWdlPzogc3RyaW5nXHJcbiAgICBkZXRhaWxzPzogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXBpUmVzcG9uc2U8VD4ge1xyXG4gICAgaWQ6IHN0cmluZ1xyXG4gICAgc3VjY2VzczogYm9vbGVhblxyXG4gICAgZXJyb3I/OiBBcGlFcnJvclxyXG4gICAgcmVzdWx0PzogVFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFzc2VtYmx5TW9kZWxcclxue1xyXG4gICAgaWQ/OiBzdHJpbmdcclxuICAgIG5hbWU/OiBzdHJpbmdcclxuICAgIHBhdGg/OiBzdHJpbmdcclxuICAgIGhhc01ldGFkYXRhPzogYm9vbGVhbixcclxuICAgIG5hbWVzcGFjZXM/OiBOYW1lc3BhY2VNb2RlbFtdXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmFtZXNwYWNlTW9kZWxcclxue1xyXG4gICAgbmFtZT86IHN0cmluZ1xyXG4gICAgdHlwZXM/OiBUeXBlTW9kZWxbXVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBNZW1iZXJLaW5kXHJcbntcclxuICAgIEZpZWxkLFxyXG4gICAgTWV0aG9kLFxyXG4gICAgUHJvcGVydHksXHJcbiAgICBFdmVudCxcclxuICAgIFR5cGVcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNZW1iZXJNb2RlbFxyXG57XHJcbiAgICBuYW1lPzogc3RyaW5nLFxyXG4gICAga2luZD86IE1lbWJlcktpbmRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1lbWJlcklzVHlwZShtOiBNZW1iZXJNb2RlbCk6IG0gaXMgVHlwZU1vZGVsIHtcclxuICAgIHJldHVybiBtLmtpbmQgPT0gTWVtYmVyS2luZC5UeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVNb2RlbCBleHRlbmRzIE1lbWJlck1vZGVsXHJcbntcclxuICAgIG1lbWJlcnM/OiBNZW1iZXJNb2RlbFtdXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
