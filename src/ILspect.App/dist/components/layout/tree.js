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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0L3RyZWUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztRQUtNLFNBQVMsRUFDVCxhQUFhOzs7Ozs7Ozs7O1lBRGIsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUNyQixhQUFhLEdBQUcsWUFBWSxDQUFDO1lBRW5DLG1CQUEwQixLQUFLLENBQUMsU0FBUztnQkFDckMsTUFBTTtvQkFDRixJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsU0FBUyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQkFDNUMsQ0FBQztvQkFDRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTt3QkFDNUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxNQUFNO3FCQUNsRCxDQUFDLENBQUM7b0JBQ0gsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBRWxGLE1BQU0sQ0FBQyxxQkFBQyxFQUFFLGdCQUFNLEtBQUssR0FDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTLENBQ3BCLENBQUE7Z0JBQ1QsQ0FBQztZQUNMLENBQUM7WUFmRCx1QkFlQyxDQUFBO1lBRUQsdUJBQThCLEtBQUssQ0FBQyxTQUFTO2dCQUt6QztvQkFDSSxPQUFPLENBQUM7b0JBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFQRCxPQUFPLEVBQUUsQ0FBQyxLQUE4QjtvQkFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDO2dCQUNsQyxDQUFDO2dCQU9ELE9BQU8sQ0FBQyxLQUFZO29CQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2dCQUVELE1BQU07b0JBQ0YsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDO29CQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLFNBQVMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7b0JBQzVDLENBQUM7b0JBQ0QsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO29CQUVwRSxJQUFJLElBQUksQ0FBQztvQkFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQUksR0FBRyxvQkFBQyxjQUFJLEdBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSyxFQUFHLENBQUM7b0JBQzNDLENBQUM7b0JBRUQsSUFBSSxRQUFRLENBQUM7b0JBQ2IsSUFBSSxRQUFRLENBQUM7b0JBQ2IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoRCxRQUFRLEdBQUcsb0JBQUMsY0FBSSxHQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFXLEdBQUcsWUFBYSxFQUFHLENBQUM7d0JBQzVFLFFBQVEsR0FBRyxvQkFBQyxJQUFJLEdBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUFPLENBQUM7b0JBQ2pGLENBQUM7b0JBRUQsTUFBTSxDQUFDLHFCQUFDLEVBQUUsZ0JBQU0sS0FBSyxHQUNqQixxQkFBQyxDQUFDLElBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLEdBQ3hDLFFBQVMsRUFDVCxJQUFLLEVBQ04scUJBQUMsSUFBSSxJQUFDLFNBQVMsRUFBQyxpQkFBaUIsR0FDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFLLENBQ2QsQ0FDUCxFQUNILFFBQVMsQ0FDVCxDQUFBO2dCQUNULENBQUM7WUFDTCxDQUFDO1lBNUNELCtCQTRDQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvbGF5b3V0L3RyZWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWR1Y3RzIGZyb20gJy4uLy4uL3JlZHVjdHMnO1xuXG5pbXBvcnQge0ljb259IGZyb20gJy4uL3dpZGdldHMnO1xuXG5jb25zdCB0cmVlQ2xhc3MgPSBcImwtdHJlZVwiO1xuY29uc3QgdHJlZU5vZGVDbGFzcyA9IFwibC10cmVlTm9kZVwiO1xuXG5leHBvcnQgY2xhc3MgVHJlZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJVHJlZVByb3BzLCBhbnk+IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSB0cmVlQ2xhc3M7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lICs9IFwiIFwiICsgdGhpcy5wcm9wcy5jbGFzc05hbWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy5zdHlsZSwge1xuICAgICAgICAgICAgZGlzcGxheTogdGhpcy5wcm9wcy5leHBhbmRlZCA/IFwiYmxvY2tcIiA6IFwibm9uZVwiXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBzdHlsZTogc3R5bGUgfSk7XG5cbiAgICAgICAgcmV0dXJuIDx1bCB7Li4uIHByb3BzfT5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8L3VsPlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElUcmVlTm9kZVByb3BzLCBJVHJlZU5vZGVTdGF0ZT4ge1xuICAgIHN0YXRpYyBpcyhjaGlsZDogUmVhY3QuUmVhY3RFbGVtZW50PGFueT4pOiBjaGlsZCBpcyBSZWFjdC5SZWFjdEVsZW1lbnQ8SVRyZWVOb2RlUHJvcHM+IHtcbiAgICAgICAgcmV0dXJuIGNoaWxkLnR5cGUgPT0gVHJlZU5vZGU7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge2V4cGFuZGVkOiBmYWxzZX07XG4gICAgfVxuICAgIFxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWQgfSk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHRyZWVOb2RlQ2xhc3M7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lICs9IFwiIFwiICsgdGhpcy5wcm9wcy5jbGFzc05hbWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSB9KTtcblxuICAgICAgICB2YXIgaWNvbjtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaWNvbikge1xuICAgICAgICAgICAgaWNvbiA9IDxJY29uIG5hbWU9e3RoaXMucHJvcHMuaWNvbn0gLz47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXhwYW5kZXI7XG4gICAgICAgIHZhciBjaGlsZHJlbjtcbiAgICAgICAgaWYgKFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pID4gMCkge1xuICAgICAgICAgICAgZXhwYW5kZXIgPSA8SWNvbiBuYW1lPXt0aGlzLnN0YXRlLmV4cGFuZGVkID8gXCJtZW51LWRvd25cIiA6IFwibWVudS1yaWdodFwifSAvPjtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gPFRyZWUgZXhwYW5kZWQ9e3RoaXMuc3RhdGUuZXhwYW5kZWR9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvVHJlZT47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPGxpIHsuLi4gcHJvcHN9PlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBvbkNsaWNrPXt0aGlzLm9uQ2xpY2suYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAge2V4cGFuZGVyfVxuICAgICAgICAgICAgICAgIHtpY29ufVxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImwtdHJlZU5vZGUtdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50ZXh0fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9saT5cbiAgICB9XG59XG5cbmludGVyZmFjZSBJVHJlZU5vZGVQcm9wcyBleHRlbmRzIFJlYWN0LkhUTUxBdHRyaWJ1dGVzIHtcbiAgICB0ZXh0OiBzdHJpbmdcbiAgICBpY29uPzogc3RyaW5nXG59XG5cbmludGVyZmFjZSBJVHJlZU5vZGVTdGF0ZSB7XG4gICAgZXhwYW5kZWQ6IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIElUcmVlUHJvcHMgZXh0ZW5kcyBSZWFjdC5IVE1MQXR0cmlidXRlcyB7XG4gICAgZXhwYW5kZWQ/OiBib29sZWFuXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
