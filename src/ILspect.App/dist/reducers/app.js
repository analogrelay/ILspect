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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHVjZXJzL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUlBLGlDQUF3QyxzQkFBWTtnQkFBcEQ7b0JBQXdDLGVBQStCO29CQUM1RCxpQkFBWSxHQUFHLElBQUksa0NBQW1CLEVBQUUsQ0FBQztnQkFDcEQsQ0FBQztZQUFELENBQUM7WUFGRCxtREFFQyxDQUFBIiwiZmlsZSI6InJlZHVjZXJzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFN0YXRlIGZyb20gJy4uL3N0YXRlJztcbmltcG9ydCB7TXVsdGlSZWR1Y2VyfSBmcm9tICcuLi9yZWR1Y3RzJztcbmltcG9ydCB7QXNzZW1ibHlMaXN0UmVkdWNlcn0gZnJvbSAnLi9hc3NlbWJseUxpc3QnO1xuXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25SZWR1Y2VyIGV4dGVuZHMgTXVsdGlSZWR1Y2VyPFN0YXRlLkFwcGxpY2F0aW9uPiB7XG4gICAgcHVibGljIGFzc2VtYmx5TGlzdCA9IG5ldyBBc3NlbWJseUxpc3RSZWR1Y2VyKCk7XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
