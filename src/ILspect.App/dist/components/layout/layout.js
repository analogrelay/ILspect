System.register(['react'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React;
    var LayoutContext, LayoutComponent;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            }],
        execute: function() {
            class LayoutContext {
                constructor(parent) {
                    this.parent = parent;
                }
            }
            exports_1("LayoutContext", LayoutContext);
            class LayoutComponent extends React.Component {
                get parent() { return this.props.layoutContext.parent; }
            }
            exports_1("LayoutComponent", LayoutComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0L2xheW91dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFVQTtnQkFDSSxZQUFtQixNQUF3QjtvQkFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7Z0JBQUcsQ0FBQztZQUNuRCxDQUFDO1lBRkQseUNBRUMsQ0FBQTtZQUVELDhCQUFrRSxLQUFLLENBQUMsU0FBUztnQkFDN0UsSUFBSSxNQUFNLEtBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlFLENBQUM7WUFGRCw2Q0FFQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvbGF5b3V0L2xheW91dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGludGVyZmFjZSBJTGF5b3V0Q29tcG9uZW50IHtcbiAgICBwcm9wczogSUxheW91dFByb3BzXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxheW91dFByb3BzIHtcbiAgICBsYXlvdXRDb250ZXh0PzogTGF5b3V0Q29udGV4dFxufVxuXG5leHBvcnQgY2xhc3MgTGF5b3V0Q29udGV4dCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHBhcmVudDogSUxheW91dENvbXBvbmVudCkge31cbn1cblxuZXhwb3J0IGNsYXNzIExheW91dENvbXBvbmVudDxUUHJvcHMgZXh0ZW5kcyBJTGF5b3V0UHJvcHM+IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFRQcm9wcywgYW55PiBpbXBsZW1lbnRzIElMYXlvdXRDb21wb25lbnQge1xuICAgIGdldCBwYXJlbnQoKTogSUxheW91dENvbXBvbmVudCB7IHJldHVybiB0aGlzLnByb3BzLmxheW91dENvbnRleHQucGFyZW50OyB9XG59ICJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
