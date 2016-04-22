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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBMkNBLHNCQUE2QixDQUFjO1FBQ3ZDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDckMsQ0FBQztJQUZELHVDQUVDLENBQUE7Ozs7WUFqQkQsV0FBWSxVQUFVO2dCQUVsQiw2Q0FBSyxDQUFBO2dCQUNMLCtDQUFNLENBQUE7Z0JBQ04sbURBQVEsQ0FBQTtnQkFDUiw2Q0FBSyxDQUFBO2dCQUNMLDJDQUFJLENBQUE7WUFDUixDQUFDLEVBUFcsVUFBVSxLQUFWLFVBQVUsUUFPckI7Z0RBQUEiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBBcGlFcnJvciB7XG4gICAgdHlwZT86IHN0cmluZ1xuICAgIG1lc3NhZ2U/OiBzdHJpbmdcbiAgICBkZXRhaWxzPzogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBpUmVzcG9uc2U8VD4ge1xuICAgIGlkOiBzdHJpbmdcbiAgICBzdWNjZXNzOiBib29sZWFuXG4gICAgZXJyb3I/OiBBcGlFcnJvclxuICAgIHJlc3VsdD86IFRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBc3NlbWJseU1vZGVsXG57XG4gICAgaWQ/OiBzdHJpbmdcbiAgICBuYW1lPzogc3RyaW5nXG4gICAgcGF0aD86IHN0cmluZ1xuICAgIGhhc01ldGFkYXRhPzogYm9vbGVhbixcbiAgICBuYW1lc3BhY2VzPzogTmFtZXNwYWNlTW9kZWxbXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5hbWVzcGFjZU1vZGVsXG57XG4gICAgbmFtZT86IHN0cmluZ1xuICAgIHR5cGVzPzogVHlwZU1vZGVsW11cbn1cblxuZXhwb3J0IGVudW0gTWVtYmVyS2luZFxue1xuICAgIEZpZWxkLFxuICAgIE1ldGhvZCxcbiAgICBQcm9wZXJ0eSxcbiAgICBFdmVudCxcbiAgICBUeXBlXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVtYmVyTW9kZWxcbntcbiAgICBuYW1lPzogc3RyaW5nLFxuICAgIGtpbmQ/OiBNZW1iZXJLaW5kXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZW1iZXJJc1R5cGUobTogTWVtYmVyTW9kZWwpOiBtIGlzIFR5cGVNb2RlbCB7XG4gICAgcmV0dXJuIG0ua2luZCA9PSBNZW1iZXJLaW5kLlR5cGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZU1vZGVsIGV4dGVuZHMgTWVtYmVyTW9kZWxcbntcbiAgICBtZW1iZXJzPzogTWVtYmVyTW9kZWxbXVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
