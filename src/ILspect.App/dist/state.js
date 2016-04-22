System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MemberKind, AssemblyStatus;
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
            (function (AssemblyStatus) {
                AssemblyStatus[AssemblyStatus["Loading"] = 0] = "Loading";
                AssemblyStatus[AssemblyStatus["Loaded"] = 1] = "Loaded";
            })(AssemblyStatus || (AssemblyStatus = {}));
            exports_1("AssemblyStatus", AssemblyStatus);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUF3Q0Esc0JBQTZCLENBQVM7UUFDbEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRkQsdUNBRUMsQ0FBQTs7OztZQXBCRCxXQUFZLFVBQVU7Z0JBRWxCLDZDQUFLLENBQUE7Z0JBQ0wsK0NBQU0sQ0FBQTtnQkFDTixtREFBUSxDQUFBO2dCQUNSLDZDQUFLLENBQUE7Z0JBQ0wsMkNBQUksQ0FBQTtZQUNSLENBQUMsRUFQVyxVQUFVLEtBQVYsVUFBVSxRQU9yQjtnREFBQTtZQWVELFdBQVksY0FBYztnQkFDdEIseURBQU8sQ0FBQTtnQkFDUCx1REFBTSxDQUFBO1lBQ1YsQ0FBQyxFQUhXLGNBQWMsS0FBZCxjQUFjLFFBR3pCO3dEQUFBIiwiZmlsZSI6InN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpb24ge1xuICAgIGFzc2VtYmx5TGlzdD86IEFzc2VtYmx5TGlzdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBc3NlbWJseUxpc3Qge1xuICAgIGFzc2VtYmxpZXM/OiBJbW11dGFibGUuTGlzdDxBc3NlbWJseT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBBc3NlbWJseSB7XG4gICAgbmFtZT86IHN0cmluZ1xuICAgIHBhdGg/OiBzdHJpbmdcbiAgICBzdGF0dXM/OiBBc3NlbWJseVN0YXR1c1xuICAgIG5hbWVzcGFjZXM/OiBOYW1lc3BhY2VbXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5hbWVzcGFjZSB7XG4gICAgbmFtZT86IHN0cmluZ1xuICAgIHR5cGVzPzogVHlwZVtdXG59XG5cbmV4cG9ydCBlbnVtIE1lbWJlcktpbmRcbntcbiAgICBGaWVsZCxcbiAgICBNZXRob2QsXG4gICAgUHJvcGVydHksXG4gICAgRXZlbnQsXG4gICAgVHlwZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1lbWJlciB7XG4gICAgbmFtZT86IHN0cmluZyxcbiAgICBraW5kPzogTWVtYmVyS2luZFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFR5cGUgZXh0ZW5kcyBNZW1iZXIge1xuICAgIG1lbWJlcnM/OiBNZW1iZXJbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVtYmVySXNUeXBlKG06IE1lbWJlcik6IG0gaXMgVHlwZSB7XG4gICAgcmV0dXJuIG0ua2luZCA9PSBNZW1iZXJLaW5kLlR5cGU7XG59XG5cbmV4cG9ydCBlbnVtIEFzc2VtYmx5U3RhdHVzIHtcbiAgICBMb2FkaW5nLFxuICAgIExvYWRlZFxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
