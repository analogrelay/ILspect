System.register(['react', './layout/tree'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React, tree_1;
    var TypeList, TypeListEntry;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (tree_1_1) {
                tree_1 = tree_1_1;
            }],
        execute: function() {
            class TypeList extends React.Component {
                render() {
                    return React.createElement(tree_1.Tree, {className: "c-typeList"}, this.props.types.map((type) => {
                        return React.createElement(TypeListEntry, {key: type.name, type: type});
                    }));
                }
            }
            exports_1("TypeList", TypeList);
            class TypeListEntry extends React.Component {
                render() {
                    var className = 'c-typeListEntry';
                    return React.createElement(tree_1.TreeNode, {className: className, icon: "leaf", text: this.props.type.name});
                }
            }
            exports_1("TypeListEntry", TypeListEntry);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdHlwZUxpc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1lBT0EsdUJBQThCLEtBQUssQ0FBQyxTQUFTO2dCQUN6QyxNQUFNO29CQUNGLE1BQU0sQ0FBQyxvQkFBQyxXQUFJLEdBQUMsU0FBUyxFQUFDLFlBQVksR0FDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTt3QkFDdkIsTUFBTSxDQUFDLG9CQUFDLGFBQWEsR0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUssRUFBQyxJQUFJLEVBQUUsSUFBSyxFQUFHLENBQUE7b0JBQ3hELENBQUMsQ0FBRSxDQUNBLENBQUE7Z0JBQ1gsQ0FBQztZQUNMLENBQUM7WUFSRCwrQkFRQyxDQUFBO1lBRUQsNEJBQW1DLEtBQUssQ0FBQyxTQUFTO2dCQUM5QyxNQUFNO29CQUNGLElBQUksU0FBUyxHQUFHLGlCQUFpQixDQUFDO29CQUVsQyxNQUFNLENBQUMsb0JBQUMsZUFBUSxHQUFDLFNBQVMsRUFBRSxTQUFVLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSyxFQUFHLENBQUM7Z0JBQ3RGLENBQUM7WUFDTCxDQUFDO1lBTkQseUNBTUMsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL3R5cGVMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgU3RhdGUgZnJvbSAnLi4vc3RhdGUnO1xyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJy4uL3JlZHVjdHMnO1xyXG5cclxuaW1wb3J0IHtUcmVlLFRyZWVOb2RlfSBmcm9tICcuL2xheW91dC90cmVlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUeXBlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJVHlwZUxpc3RQcm9wcywgYW55PiB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxUcmVlIGNsYXNzTmFtZT1cImMtdHlwZUxpc3RcIj5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMudHlwZXMubWFwKCh0eXBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPFR5cGVMaXN0RW50cnkga2V5PXt0eXBlLm5hbWV9IHR5cGU9e3R5cGV9IC8+ICBcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9UcmVlPlxyXG4gICAgfSAgICBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFR5cGVMaXN0RW50cnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SVR5cGVMaXN0RW50cnlQcm9wcywgYW55PiB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdjLXR5cGVMaXN0RW50cnknO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiA8VHJlZU5vZGUgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGljb249XCJsZWFmXCIgdGV4dD17dGhpcy5wcm9wcy50eXBlLm5hbWV9IC8+O1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSVR5cGVMaXN0RW50cnlQcm9wcyB7XHJcbiAgICB0eXBlPzogU3RhdGUuVHlwZVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSVR5cGVMaXN0UHJvcHMge1xyXG4gICAgdHlwZXM/OiBTdGF0ZS5UeXBlW11cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
