System.register(['react', './widgets'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React, widgets_1;
    var NamespaceList, NamespaceListEntry;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (widgets_1_1) {
                widgets_1 = widgets_1_1;
            }],
        execute: function() {
            class NamespaceList extends React.Component {
                render() {
                    return React.createElement("ul", {className: "c-assemblyList"}, this.props.namespaces.map((ns) => {
                        return React.createElement(NamespaceListEntry, {key: ns.name, namespace: ns});
                    }));
                }
            }
            exports_1("NamespaceList", NamespaceList);
            class NamespaceListEntry extends React.Component {
                render() {
                    var className = 'c-namespaceListEntry';
                    return React.createElement("li", {className: className}, React.createElement(widgets_1.Icon, {name: "menu-right"}), React.createElement(widgets_1.Icon, {name: "folder-close"}), React.createElement("span", {className: "c-namespaceListEntry-text"}, this.props.namespace.name));
                }
            }
            exports_1("NamespaceListEntry", NamespaceListEntry);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmFtZXNwYWNlTGlzdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFPQSw0QkFBbUMsS0FBSyxDQUFDLFNBQVM7Z0JBQzlDLE1BQU07b0JBQ0YsTUFBTSxDQUFDLHFCQUFDLEVBQUUsSUFBQyxTQUFTLEVBQUMsZ0JBQWdCLEdBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQzFCLE1BQU0sQ0FBQyxvQkFBQyxrQkFBa0IsR0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUssRUFBQyxTQUFTLEVBQUUsRUFBRyxFQUFHLENBQUE7b0JBQzlELENBQUMsQ0FBRSxDQUNGLENBQUE7Z0JBQ1QsQ0FBQztZQUNMLENBQUM7WUFSRCx5Q0FRQyxDQUFBO1lBRUQsaUNBQXdDLEtBQUssQ0FBQyxTQUFTO2dCQUNuRCxNQUFNO29CQUNGLElBQUksU0FBUyxHQUFHLHNCQUFzQixDQUFDO29CQUV2QyxNQUFNLENBQUMscUJBQUMsRUFBRSxJQUFDLFNBQVMsRUFBRSxTQUFVLEdBQzVCLG9CQUFDLGNBQUksR0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFHLEVBQzFCLG9CQUFDLGNBQUksR0FBQyxJQUFJLEVBQUMsY0FBYyxFQUFHLEVBQzVCLHFCQUFDLElBQUksSUFBQyxTQUFTLEVBQUMsMkJBQTJCLEdBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUssQ0FDeEIsQ0FDTixDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBWkQsbURBWUMsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL25hbWVzcGFjZUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFN0YXRlIGZyb20gJy4uL3N0YXRlJztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAnLi4vcmVkdWN0cyc7XG5cbmltcG9ydCB7SWNvbn0gZnJvbSAnLi93aWRnZXRzJ1xuXG5leHBvcnQgY2xhc3MgTmFtZXNwYWNlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJTmFtZXNwYWNlTGlzdFByb3BzLCBhbnk+IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8dWwgY2xhc3NOYW1lPVwiYy1hc3NlbWJseUxpc3RcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLm5hbWVzcGFjZXMubWFwKChucykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8TmFtZXNwYWNlTGlzdEVudHJ5IGtleT17bnMubmFtZX0gbmFtZXNwYWNlPXtuc30gLz4gIFxuICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvdWw+XG4gICAgfSAgICBcbn1cblxuZXhwb3J0IGNsYXNzIE5hbWVzcGFjZUxpc3RFbnRyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJTmFtZXNwYWNlTGlzdEVudHJ5UHJvcHMsIGFueT4ge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdjLW5hbWVzcGFjZUxpc3RFbnRyeSc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gPGxpIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgICAgIDxJY29uIG5hbWU9XCJtZW51LXJpZ2h0XCIgLz5cbiAgICAgICAgICAgIDxJY29uIG5hbWU9XCJmb2xkZXItY2xvc2VcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYy1uYW1lc3BhY2VMaXN0RW50cnktdGV4dFwiPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLm5hbWVzcGFjZS5uYW1lfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2xpPjtcbiAgICB9XG59XG5cbmludGVyZmFjZSBJTmFtZXNwYWNlTGlzdEVudHJ5UHJvcHMge1xuICAgIG5hbWVzcGFjZT86IFN0YXRlLk5hbWVzcGFjZVxufVxuXG5pbnRlcmZhY2UgSU5hbWVzcGFjZUxpc3RQcm9wcyB7XG4gICAgbmFtZXNwYWNlcz86IFN0YXRlLk5hbWVzcGFjZVtdXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
