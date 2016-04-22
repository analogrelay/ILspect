System.register(['react', './typeList', './layout/tree'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React, typeList_1, tree_1;
    var NamespaceList, NamespaceListEntry;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (typeList_1_1) {
                typeList_1 = typeList_1_1;
            },
            function (tree_1_1) {
                tree_1 = tree_1_1;
            }],
        execute: function() {
            class NamespaceList extends React.Component {
                render() {
                    return React.createElement(tree_1.Tree, {className: "c-assemblyList"}, this.props.namespaces.map((ns) => {
                        return React.createElement(NamespaceListEntry, {key: ns.name, namespace: ns});
                    }));
                }
            }
            exports_1("NamespaceList", NamespaceList);
            class NamespaceListEntry extends React.Component {
                render() {
                    var className = 'c-namespaceListEntry';
                    return React.createElement(tree_1.TreeNode, {className: className, icon: "gift", text: this.props.namespace.name || "<Default>"}, React.createElement(typeList_1.TypeList, {types: this.props.namespace.types}));
                }
            }
            exports_1("NamespaceListEntry", NamespaceListEntry);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmFtZXNwYWNlTGlzdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFRQSw0QkFBbUMsS0FBSyxDQUFDLFNBQVM7Z0JBQzlDLE1BQU07b0JBQ0YsTUFBTSxDQUFDLG9CQUFDLFdBQUksR0FBQyxTQUFTLEVBQUMsZ0JBQWdCLEdBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQzFCLE1BQU0sQ0FBQyxvQkFBQyxrQkFBa0IsR0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUssRUFBQyxTQUFTLEVBQUUsRUFBRyxFQUFHLENBQUE7b0JBQzlELENBQUMsQ0FBRSxDQUNBLENBQUE7Z0JBQ1gsQ0FBQztZQUNMLENBQUM7WUFSRCx5Q0FRQyxDQUFBO1lBRUQsaUNBQXdDLEtBQUssQ0FBQyxTQUFTO2dCQUNuRCxNQUFNO29CQUNGLElBQUksU0FBUyxHQUFHLHNCQUFzQixDQUFDO29CQUV2QyxNQUFNLENBQUMsb0JBQUMsZUFBUSxHQUFDLFNBQVMsRUFBRSxTQUFVLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLFdBQWEsR0FDL0Ysb0JBQUMsbUJBQVEsR0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBTSxFQUFHLENBQ3hDLENBQUM7Z0JBQ2hCLENBQUM7WUFDTCxDQUFDO1lBUkQsbURBUUMsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL25hbWVzcGFjZUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBTdGF0ZSBmcm9tICcuLi9zdGF0ZSc7XHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAnLi4vcmVkdWN0cyc7XHJcblxyXG5pbXBvcnQge1R5cGVMaXN0fSBmcm9tICcuL3R5cGVMaXN0JztcclxuaW1wb3J0IHtUcmVlLFRyZWVOb2RlfSBmcm9tICcuL2xheW91dC90cmVlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOYW1lc3BhY2VMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElOYW1lc3BhY2VMaXN0UHJvcHMsIGFueT4ge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8VHJlZSBjbGFzc05hbWU9XCJjLWFzc2VtYmx5TGlzdFwiPlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5uYW1lc3BhY2VzLm1hcCgobnMpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8TmFtZXNwYWNlTGlzdEVudHJ5IGtleT17bnMubmFtZX0gbmFtZXNwYWNlPXtuc30gLz4gIFxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICA8L1RyZWU+XHJcbiAgICB9ICAgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmFtZXNwYWNlTGlzdEVudHJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElOYW1lc3BhY2VMaXN0RW50cnlQcm9wcywgYW55PiB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdjLW5hbWVzcGFjZUxpc3RFbnRyeSc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIDxUcmVlTm9kZSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gaWNvbj1cImdpZnRcIiB0ZXh0PXt0aGlzLnByb3BzLm5hbWVzcGFjZS5uYW1lIHx8IFwiPERlZmF1bHQ+XCIgfT5cclxuICAgICAgICAgICAgPFR5cGVMaXN0IHR5cGVzPXt0aGlzLnByb3BzLm5hbWVzcGFjZS50eXBlc30gLz5cclxuICAgICAgICA8L1RyZWVOb2RlPjtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElOYW1lc3BhY2VMaXN0RW50cnlQcm9wcyB7XHJcbiAgICBuYW1lc3BhY2U/OiBTdGF0ZS5OYW1lc3BhY2VcclxufVxyXG5cclxuaW50ZXJmYWNlIElOYW1lc3BhY2VMaXN0UHJvcHMge1xyXG4gICAgbmFtZXNwYWNlcz86IFN0YXRlLk5hbWVzcGFjZVtdXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
