System.register(['react', '../widgets'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __assign = (this && this.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var React, widgets_1;
    var treeClass, treeNodeClass, Tree, TreeNode;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (widgets_1_1) {
                widgets_1 = widgets_1_1;
            }],
        execute: function() {
            treeClass = "l-tree";
            treeNodeClass = "l-treeNode";
            class Tree extends React.Component {
                render() {
                    var className = treeClass;
                    if (this.props.className) {
                        className += " " + this.props.className;
                    }
                    var style = Object.assign({}, this.props.style, {
                        display: this.props.expanded ? "block" : "none"
                    });
                    var props = Object.assign({}, this.props, { className: className, style: style });
                    return React.createElement("ul", __assign({}, props), this.props.children);
                }
            }
            exports_1("Tree", Tree);
            class TreeNode extends React.Component {
                constructor() {
                    super();
                    this.state = { expanded: false };
                }
                static is(child) {
                    return child.type == TreeNode;
                }
                onClick(event) {
                    this.setState({ expanded: !this.state.expanded });
                }
                render() {
                    var className = treeNodeClass;
                    if (this.props.className) {
                        className += " " + this.props.className;
                    }
                    var props = Object.assign({}, this.props, { className: className });
                    var icon;
                    if (this.props.icon) {
                        icon = React.createElement(widgets_1.Icon, {name: this.props.icon});
                    }
                    var expander;
                    var children;
                    if (React.Children.count(this.props.children) > 0) {
                        expander = React.createElement(widgets_1.Icon, {name: this.state.expanded ? "menu-down" : "menu-right"});
                        children = React.createElement(Tree, {expanded: this.state.expanded}, this.props.children);
                    }
                    return React.createElement("li", __assign({}, props), React.createElement("a", {href: "#", onClick: this.onClick.bind(this)}, expander, icon, React.createElement("span", {className: "l-treeNode-text"}, this.props.text)), children);
                }
            }
            exports_1("TreeNode", TreeNode);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0L3RyZWUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztRQUtNLFNBQVMsRUFDVCxhQUFhOzs7Ozs7Ozs7O1lBRGIsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUNyQixhQUFhLEdBQUcsWUFBWSxDQUFDO1lBRW5DLG1CQUEwQixLQUFLLENBQUMsU0FBUztnQkFDckMsTUFBTTtvQkFDRixJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsU0FBUyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQkFDNUMsQ0FBQztvQkFDRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTt3QkFDNUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxNQUFNO3FCQUNsRCxDQUFDLENBQUM7b0JBQ0gsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBRWxGLE1BQU0sQ0FBQyxxQkFBQyxFQUFFLGdCQUFNLEtBQUssR0FDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTLENBQ3BCLENBQUE7Z0JBQ1QsQ0FBQztZQUNMLENBQUM7WUFmRCx1QkFlQyxDQUFBO1lBRUQsdUJBQThCLEtBQUssQ0FBQyxTQUFTO2dCQUt6QztvQkFDSSxPQUFPLENBQUM7b0JBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFQRCxPQUFPLEVBQUUsQ0FBQyxLQUE4QjtvQkFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDO2dCQUNsQyxDQUFDO2dCQU9ELE9BQU8sQ0FBQyxLQUFZO29CQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2dCQUVELE1BQU07b0JBQ0YsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDO29CQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLFNBQVMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7b0JBQzVDLENBQUM7b0JBQ0QsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO29CQUVwRSxJQUFJLElBQUksQ0FBQztvQkFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQUksR0FBRyxvQkFBQyxjQUFJLEdBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSyxFQUFHLENBQUM7b0JBQzNDLENBQUM7b0JBRUQsSUFBSSxRQUFRLENBQUM7b0JBQ2IsSUFBSSxRQUFRLENBQUM7b0JBQ2IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoRCxRQUFRLEdBQUcsb0JBQUMsY0FBSSxHQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFXLEdBQUcsWUFBYSxFQUFHLENBQUM7d0JBQzVFLFFBQVEsR0FBRyxvQkFBQyxJQUFJLEdBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUFPLENBQUM7b0JBQ2pGLENBQUM7b0JBRUQsTUFBTSxDQUFDLHFCQUFDLEVBQUUsZ0JBQU0sS0FBSyxHQUNqQixxQkFBQyxDQUFDLElBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLEdBQ3hDLFFBQVMsRUFDVCxJQUFLLEVBQ04scUJBQUMsSUFBSSxJQUFDLFNBQVMsRUFBQyxpQkFBaUIsR0FDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFLLENBQ2QsQ0FDUCxFQUNILFFBQVMsQ0FDVCxDQUFBO2dCQUNULENBQUM7WUFDTCxDQUFDO1lBNUNELCtCQTRDQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvbGF5b3V0L3RyZWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIFJlZHVjdHMgZnJvbSAnLi4vLi4vcmVkdWN0cyc7XHJcblxyXG5pbXBvcnQge0ljb259IGZyb20gJy4uL3dpZGdldHMnO1xyXG5cclxuY29uc3QgdHJlZUNsYXNzID0gXCJsLXRyZWVcIjtcclxuY29uc3QgdHJlZU5vZGVDbGFzcyA9IFwibC10cmVlTm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyZWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SVRyZWVQcm9wcywgYW55PiB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHRyZWVDbGFzcztcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lICs9IFwiIFwiICsgdGhpcy5wcm9wcy5jbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuc3R5bGUsIHtcclxuICAgICAgICAgICAgZGlzcGxheTogdGhpcy5wcm9wcy5leHBhbmRlZCA/IFwiYmxvY2tcIiA6IFwibm9uZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgc3R5bGU6IHN0eWxlIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gPHVsIHsuLi4gcHJvcHN9PlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICA8L3VsPlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZU5vZGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SVRyZWVOb2RlUHJvcHMsIElUcmVlTm9kZVN0YXRlPiB7XHJcbiAgICBzdGF0aWMgaXMoY2hpbGQ6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+KTogY2hpbGQgaXMgUmVhY3QuUmVhY3RFbGVtZW50PElUcmVlTm9kZVByb3BzPiB7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkLnR5cGUgPT0gVHJlZU5vZGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtleHBhbmRlZDogZmFsc2V9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWQgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICB2YXIgY2xhc3NOYW1lID0gdHJlZU5vZGVDbGFzcztcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lICs9IFwiIFwiICsgdGhpcy5wcm9wcy5jbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUgfSk7XHJcblxyXG4gICAgICAgIHZhciBpY29uO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmljb24pIHtcclxuICAgICAgICAgICAgaWNvbiA9IDxJY29uIG5hbWU9e3RoaXMucHJvcHMuaWNvbn0gLz47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZXhwYW5kZXI7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuO1xyXG4gICAgICAgIGlmIChSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKSA+IDApIHtcclxuICAgICAgICAgICAgZXhwYW5kZXIgPSA8SWNvbiBuYW1lPXt0aGlzLnN0YXRlLmV4cGFuZGVkID8gXCJtZW51LWRvd25cIiA6IFwibWVudS1yaWdodFwifSAvPjtcclxuICAgICAgICAgICAgY2hpbGRyZW4gPSA8VHJlZSBleHBhbmRlZD17dGhpcy5zdGF0ZS5leHBhbmRlZH0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9UcmVlPjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiA8bGkgey4uLiBwcm9wc30+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgb25DbGljaz17dGhpcy5vbkNsaWNrLmJpbmQodGhpcyl9PlxyXG4gICAgICAgICAgICAgICAge2V4cGFuZGVyfVxyXG4gICAgICAgICAgICAgICAge2ljb259XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsLXRyZWVOb2RlLXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50ZXh0fVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L2xpPlxyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSVRyZWVOb2RlUHJvcHMgZXh0ZW5kcyBSZWFjdC5IVE1MQXR0cmlidXRlcyB7XHJcbiAgICB0ZXh0OiBzdHJpbmdcclxuICAgIGljb24/OiBzdHJpbmdcclxufVxyXG5cclxuaW50ZXJmYWNlIElUcmVlTm9kZVN0YXRlIHtcclxuICAgIGV4cGFuZGVkOiBib29sZWFuXHJcbn1cclxuXHJcbmludGVyZmFjZSBJVHJlZVByb3BzIGV4dGVuZHMgUmVhY3QuSFRNTEF0dHJpYnV0ZXMge1xyXG4gICAgZXhwYW5kZWQ/OiBib29sZWFuXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
