System.register(['../reducts', './assemblyList'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var reducts_1, assemblyList_1;
    var ApplicationReducer;
    return {
        setters:[
            function (reducts_1_1) {
                reducts_1 = reducts_1_1;
            },
            function (assemblyList_1_1) {
                assemblyList_1 = assemblyList_1_1;
            }],
        execute: function() {
            class ApplicationReducer extends reducts_1.MultiReducer {
                constructor(...args) {
                    super(...args);
                    this.assemblyList = new assemblyList_1.AssemblyListReducer();
                }
            }
            exports_1("ApplicationReducer", ApplicationReducer);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHVjZXJzL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUlBLGlDQUF3QyxzQkFBWTtnQkFBcEQ7b0JBQXdDLGVBQStCO29CQUM1RCxpQkFBWSxHQUFHLElBQUksa0NBQW1CLEVBQUUsQ0FBQztnQkFDcEQsQ0FBQztZQUFELENBQUM7WUFGRCxtREFFQyxDQUFBIiwiZmlsZSI6InJlZHVjZXJzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFN0YXRlIGZyb20gJy4uL3N0YXRlJztcclxuaW1wb3J0IHtNdWx0aVJlZHVjZXJ9IGZyb20gJy4uL3JlZHVjdHMnO1xyXG5pbXBvcnQge0Fzc2VtYmx5TGlzdFJlZHVjZXJ9IGZyb20gJy4vYXNzZW1ibHlMaXN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvblJlZHVjZXIgZXh0ZW5kcyBNdWx0aVJlZHVjZXI8U3RhdGUuQXBwbGljYXRpb24+IHtcclxuICAgIHB1YmxpYyBhc3NlbWJseUxpc3QgPSBuZXcgQXNzZW1ibHlMaXN0UmVkdWNlcigpO1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
