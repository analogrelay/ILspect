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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUF3Q0Esc0JBQTZCLENBQVM7UUFDbEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRkQsdUNBRUMsQ0FBQTs7OztZQXBCRCxXQUFZLFVBQVU7Z0JBRWxCLDZDQUFLLENBQUE7Z0JBQ0wsK0NBQU0sQ0FBQTtnQkFDTixtREFBUSxDQUFBO2dCQUNSLDZDQUFLLENBQUE7Z0JBQ0wsMkNBQUksQ0FBQTtZQUNSLENBQUMsRUFQVyxVQUFVLEtBQVYsVUFBVSxRQU9yQjtnREFBQTtZQWVELFdBQVksY0FBYztnQkFDdEIseURBQU8sQ0FBQTtnQkFDUCx1REFBTSxDQUFBO1lBQ1YsQ0FBQyxFQUhXLGNBQWMsS0FBZCxjQUFjLFFBR3pCO3dEQUFBIiwiZmlsZSI6InN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aW9uIHtcclxuICAgIGFzc2VtYmx5TGlzdD86IEFzc2VtYmx5TGlzdDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBc3NlbWJseUxpc3Qge1xyXG4gICAgYXNzZW1ibGllcz86IEltbXV0YWJsZS5MaXN0PEFzc2VtYmx5PlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFzc2VtYmx5IHtcclxuICAgIG5hbWU/OiBzdHJpbmdcclxuICAgIHBhdGg/OiBzdHJpbmdcclxuICAgIHN0YXR1cz86IEFzc2VtYmx5U3RhdHVzXHJcbiAgICBuYW1lc3BhY2VzPzogTmFtZXNwYWNlW11cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOYW1lc3BhY2Uge1xyXG4gICAgbmFtZT86IHN0cmluZ1xyXG4gICAgdHlwZXM/OiBUeXBlW11cclxufVxyXG5cclxuZXhwb3J0IGVudW0gTWVtYmVyS2luZFxyXG57XHJcbiAgICBGaWVsZCxcclxuICAgIE1ldGhvZCxcclxuICAgIFByb3BlcnR5LFxyXG4gICAgRXZlbnQsXHJcbiAgICBUeXBlXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWVtYmVyIHtcclxuICAgIG5hbWU/OiBzdHJpbmcsXHJcbiAgICBraW5kPzogTWVtYmVyS2luZFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGUgZXh0ZW5kcyBNZW1iZXIge1xyXG4gICAgbWVtYmVycz86IE1lbWJlcltdXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtZW1iZXJJc1R5cGUobTogTWVtYmVyKTogbSBpcyBUeXBlIHtcclxuICAgIHJldHVybiBtLmtpbmQgPT0gTWVtYmVyS2luZC5UeXBlO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBBc3NlbWJseVN0YXR1cyB7XHJcbiAgICBMb2FkaW5nLFxyXG4gICAgTG9hZGVkXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
