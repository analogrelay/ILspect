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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0L2xheW91dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFVQTtnQkFDSSxZQUFtQixNQUF3QjtvQkFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7Z0JBQUcsQ0FBQztZQUNuRCxDQUFDO1lBRkQseUNBRUMsQ0FBQTtZQUVELDhCQUFrRSxLQUFLLENBQUMsU0FBUztnQkFDN0UsSUFBSSxNQUFNLEtBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlFLENBQUM7WUFGRCw2Q0FFQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvbGF5b3V0L2xheW91dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUxheW91dENvbXBvbmVudCB7XHJcbiAgICBwcm9wczogSUxheW91dFByb3BzXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUxheW91dFByb3BzIHtcclxuICAgIGxheW91dENvbnRleHQ/OiBMYXlvdXRDb250ZXh0XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXRDb250ZXh0IHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXJlbnQ6IElMYXlvdXRDb21wb25lbnQpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXRDb21wb25lbnQ8VFByb3BzIGV4dGVuZHMgSUxheW91dFByb3BzPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxUUHJvcHMsIGFueT4gaW1wbGVtZW50cyBJTGF5b3V0Q29tcG9uZW50IHtcclxuICAgIGdldCBwYXJlbnQoKTogSUxheW91dENvbXBvbmVudCB7IHJldHVybiB0aGlzLnByb3BzLmxheW91dENvbnRleHQucGFyZW50OyB9XHJcbn0gIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
