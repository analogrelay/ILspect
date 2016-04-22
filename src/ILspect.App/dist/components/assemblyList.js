System.register(['react', '../state', '../reducts', './widgets', './layout/tree'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var React, State, reducts_1, widgets_1, tree_1;
    var AssemblyList, AssemblyListEntry;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (State_1) {
                State = State_1;
            },
            function (reducts_1_1) {
                reducts_1 = reducts_1_1;
            },
            function (widgets_1_1) {
                widgets_1 = widgets_1_1;
            },
            function (tree_1_1) {
                tree_1 = tree_1_1;
            }],
        execute: function() {
            let AssemblyList = class AssemblyList extends React.Component {
                render() {
                    return React.createElement("ul", {className: "l-tree c-assemblyList"}, this.props.assemblies.map((assembly) => {
                        return React.createElement(AssemblyListEntry, {key: assembly.path, assembly: assembly});
                    }));
                }
            };
            AssemblyList = __decorate([
                reducts_1.connect((state) => ({ assemblies: state.assemblyList.assemblies.toArray() }))
            ], AssemblyList);
            exports_1("AssemblyList", AssemblyList);
            class AssemblyListEntry extends React.Component {
                constructor() {
                    super();
                    this.state = { expanded: false };
                }
                onClick(event) {
                    this.setState({ expanded: !this.state.expanded });
                }
                render() {
                    var className = 'l-treeNode c-assemblyListEntry';
                    if (this.props.assembly.status == State.AssemblyStatus.Loading) {
                        className += ' c-assemblyListEntry-loading';
                    }
                    return React.createElement("li", {className: className}, React.createElement("a", {href: "#", onClick: this.onClick.bind(this)}, React.createElement(widgets_1.Icon, {name: "book"}), React.createElement("span", {class: "l-treeNode-text"}, this.props.assembly.name || "Loading...")), React.createElement(tree_1.Tree, {expanded: this.state.expanded}, this.props.assembly.namespaces ? this.props.assembly.namespaces.map((ns) => React.createElement(tree_1.TreeNode, {key: ns.name, className: className, icon: "gift", text: ns.name || "<Default>"}, ns.types ? ns.types.map((type) => React.createElement(tree_1.TreeNode, {key: type.name, className: className, icon: "leaf", text: type.name})) : "")) : ""));
                }
            }
            exports_1("AssemblyListEntry", AssemblyListEntry);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXNzZW1ibHlMaXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVVBLDhDQUFrQyxLQUFLLENBQUMsU0FBUztnQkFDN0MsTUFBTTtvQkFDRixNQUFNLENBQUMscUJBQUMsRUFBRSxJQUFDLFNBQVMsRUFBQyx1QkFBdUIsR0FDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUTt3QkFDaEMsTUFBTSxDQUFDLG9CQUFDLGlCQUFpQixHQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSyxFQUFDLFFBQVEsRUFBRSxRQUFTLEVBQUcsQ0FBQTtvQkFDeEUsQ0FBQyxDQUFFLENBQ0YsQ0FBQTtnQkFDVCxDQUFDO1lBQ0wsQ0FBQztZQVhEO2dCQUFDLGlCQUFPLENBQ0osQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQ3ZFOzRCQUFBO1lBQ0QsdUNBUUMsQ0FBQTtZQUVELGdDQUF1QyxLQUFLLENBQUMsU0FBUztnQkFFbEQ7b0JBQ0ksT0FBTyxDQUFDO29CQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQ3JDLENBQUM7Z0JBRUQsT0FBTyxDQUFDLEtBQVk7b0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELENBQUM7Z0JBRUQsTUFBTTtvQkFDRixJQUFJLFNBQVMsR0FBRyxnQ0FBZ0MsQ0FBQztvQkFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsU0FBUyxJQUFJLDhCQUE4QixDQUFDO29CQUNoRCxDQUFDO29CQUVELE1BQU0sQ0FBQyxxQkFBQyxFQUFFLElBQUMsU0FBUyxFQUFFLFNBQVUsR0FDNUIscUJBQUMsQ0FBQyxJQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRSxHQUN6QyxvQkFBQyxjQUFJLEdBQUMsSUFBSSxFQUFDLE1BQU0sRUFBRyxFQUNwQixxQkFBQyxJQUFJLElBQUMsS0FBSyxFQUFDLGlCQUFpQixHQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksWUFBYSxDQUN2QyxDQUNQLEVBQ0osb0JBQUMsV0FBSSxHQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsR0FDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQ3BFLG9CQUFDLGVBQVEsR0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUssRUFBQyxTQUFTLEVBQUUsU0FBVSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksV0FBYSxHQUNuRixFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUMxQixvQkFBQyxlQUFRLEdBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFLLEVBQUMsU0FBUyxFQUFFLFNBQVUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSyxFQUFHLENBQ2xGLEdBQUcsRUFBRyxDQUNBLENBQ2QsR0FBRyxFQUFHLENBQ0osQ0FDTixDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBbkNELGlEQW1DQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYXNzZW1ibHlMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBTdGF0ZSBmcm9tICcuLi9zdGF0ZSc7XHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAnLi4vcmVkdWN0cyc7XHJcblxyXG5pbXBvcnQge0ljb259IGZyb20gJy4vd2lkZ2V0cyc7XHJcbmltcG9ydCB7VHJlZSxUcmVlTm9kZX0gZnJvbSAnLi9sYXlvdXQvdHJlZSc7XHJcblxyXG5AY29ubmVjdDxTdGF0ZS5BcHBsaWNhdGlvbiwgSUFzc2VtYmx5TGlzdFByb3BzPihcclxuICAgIChzdGF0ZSkgPT4gKHsgYXNzZW1ibGllczogc3RhdGUuYXNzZW1ibHlMaXN0LmFzc2VtYmxpZXMudG9BcnJheSgpIH0pXHJcbilcclxuZXhwb3J0IGNsYXNzIEFzc2VtYmx5TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJQXNzZW1ibHlMaXN0UHJvcHMsIGFueT4ge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8dWwgY2xhc3NOYW1lPVwibC10cmVlIGMtYXNzZW1ibHlMaXN0XCI+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmFzc2VtYmxpZXMubWFwKChhc3NlbWJseSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxBc3NlbWJseUxpc3RFbnRyeSBrZXk9e2Fzc2VtYmx5LnBhdGh9IGFzc2VtYmx5PXthc3NlbWJseX0gLz4gIFxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICA8L3VsPlxyXG4gICAgfSAgICBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFzc2VtYmx5TGlzdEVudHJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElBc3NlbWJseUxpc3RFbnRyeVByb3BzLCBJQXNzZW1ibHlMaXN0RW50cnlTdGF0ZT4ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgZXhwYW5kZWQ6IGZhbHNlIH07XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdsLXRyZWVOb2RlIGMtYXNzZW1ibHlMaXN0RW50cnknO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFzc2VtYmx5LnN0YXR1cyA9PSBTdGF0ZS5Bc3NlbWJseVN0YXR1cy5Mb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnIGMtYXNzZW1ibHlMaXN0RW50cnktbG9hZGluZyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiA8bGkgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIG9uQ2xpY2s9e3RoaXMub25DbGljay5iaW5kKHRoaXMpfT5cclxuICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9XCJib29rXCIgLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC10cmVlTm9kZS10ZXh0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYXNzZW1ibHkubmFtZSB8fCBcIkxvYWRpbmcuLi5cIn1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8VHJlZSBleHBhbmRlZD17dGhpcy5zdGF0ZS5leHBhbmRlZH0+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5hc3NlbWJseS5uYW1lc3BhY2VzID8gdGhpcy5wcm9wcy5hc3NlbWJseS5uYW1lc3BhY2VzLm1hcCgobnMpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRyZWVOb2RlIGtleT17bnMubmFtZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IGljb249XCJnaWZ0XCIgdGV4dD17bnMubmFtZSB8fCBcIjxEZWZhdWx0PlwiIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtucy50eXBlcyA/IG5zLnR5cGVzLm1hcCgodHlwZSkgPT4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJlZU5vZGUga2V5PXt0eXBlLm5hbWV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBpY29uPVwibGVhZlwiIHRleHQ9e3R5cGUubmFtZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IFwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UcmVlTm9kZT4gXHJcbiAgICAgICAgICAgICAgICApIDogXCJcIn1cclxuICAgICAgICAgICAgPC9UcmVlPlxyXG4gICAgICAgIDwvbGk+O1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUFzc2VtYmx5TGlzdEVudHJ5UHJvcHMge1xyXG4gICAgYXNzZW1ibHk/OiBTdGF0ZS5Bc3NlbWJseVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUFzc2VtYmx5TGlzdEVudHJ5U3RhdGUge1xyXG4gICAgZXhwYW5kZWQ6IGJvb2xlYW5cclxufVxyXG5cclxuaW50ZXJmYWNlIElBc3NlbWJseUxpc3RQcm9wcyB7XHJcbiAgICBhc3NlbWJsaWVzPzogU3RhdGUuQXNzZW1ibHlbXVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
