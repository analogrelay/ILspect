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
                    function renderMember(m) {
                        var children;
                        if (State.memberIsType(m)) {
                            children = m.members.map(renderMember);
                        }
                        var icon;
                        switch (m.kind) {
                            case State.MemberKind.Event:
                                icon = "asterisk";
                                break;
                            case State.MemberKind.Field:
                                icon = "tag";
                                break;
                            case State.MemberKind.Method:
                                icon = "fire";
                                break;
                            case State.MemberKind.Property:
                                icon = "info-sign";
                                break;
                            case State.MemberKind.Type:
                                icon = "list";
                                break;
                        }
                        return React.createElement(tree_1.TreeNode, {key: m.name, className: className, icon: icon, text: m.name}, children);
                    }
                    return React.createElement("li", {className: className}, React.createElement("a", {href: "#", onClick: this.onClick.bind(this)}, React.createElement(widgets_1.Icon, {name: "book"}), React.createElement("span", {class: "l-treeNode-text"}, this.props.assembly.name || "Loading...")), React.createElement(tree_1.Tree, {expanded: this.state.expanded}, this.props.assembly.namespaces ? this.props.assembly.namespaces.map((ns) => React.createElement(tree_1.TreeNode, {key: ns.name, className: className, icon: "gift", text: ns.name || "<Default>"}, ns.types ? ns.types.map(renderMember) : "")) : ""));
                }
            }
            exports_1("AssemblyListEntry", AssemblyListEntry);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXNzZW1ibHlMaXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVVBLDhDQUFrQyxLQUFLLENBQUMsU0FBUztnQkFDN0MsTUFBTTtvQkFDRixNQUFNLENBQUMscUJBQUMsRUFBRSxJQUFDLFNBQVMsRUFBQyx1QkFBdUIsR0FDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUTt3QkFDaEMsTUFBTSxDQUFDLG9CQUFDLGlCQUFpQixHQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSyxFQUFDLFFBQVEsRUFBRSxRQUFTLEVBQUcsQ0FBQTtvQkFDeEUsQ0FBQyxDQUFFLENBQ0YsQ0FBQTtnQkFDVCxDQUFDO1lBQ0wsQ0FBQztZQVhEO2dCQUFDLGlCQUFPLENBQ0osQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQ3ZFOzRCQUFBO1lBQ0QsdUNBUUMsQ0FBQTtZQUVELGdDQUF1QyxLQUFLLENBQUMsU0FBUztnQkFFbEQ7b0JBQ0ksT0FBTyxDQUFDO29CQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQ3JDLENBQUM7Z0JBRUQsT0FBTyxDQUFDLEtBQVk7b0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELENBQUM7Z0JBRUQsTUFBTTtvQkFDRixJQUFJLFNBQVMsR0FBRyxnQ0FBZ0MsQ0FBQztvQkFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsU0FBUyxJQUFJLDhCQUE4QixDQUFDO29CQUNoRCxDQUFDO29CQUVELHNCQUFzQixDQUFlO3dCQUNqQyxJQUFJLFFBQVEsQ0FBQzt3QkFDYixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdkIsUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO3dCQUMxQyxDQUFDO3dCQUVELElBQUksSUFBSSxDQUFDO3dCQUVULE1BQU0sQ0FBQSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNaLEtBQUssS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLO2dDQUN2QixJQUFJLEdBQUcsVUFBVSxDQUFDO2dDQUNsQixLQUFLLENBQUM7NEJBQ1YsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUs7Z0NBQ3ZCLElBQUksR0FBRyxLQUFLLENBQUM7Z0NBQ2IsS0FBSyxDQUFDOzRCQUNWLEtBQUssS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNO2dDQUN4QixJQUFJLEdBQUcsTUFBTSxDQUFDO2dDQUNkLEtBQUssQ0FBQzs0QkFDVixLQUFLLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUTtnQ0FDMUIsSUFBSSxHQUFHLFdBQVcsQ0FBQztnQ0FDbkIsS0FBSyxDQUFDOzRCQUNWLEtBQUssS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJO2dDQUN0QixJQUFJLEdBQUcsTUFBTSxDQUFDO2dDQUNkLEtBQUssQ0FBQzt3QkFDZCxDQUFDO3dCQUVELE1BQU0sQ0FBQyxvQkFBQyxlQUFRLEdBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFLLEVBQUMsU0FBUyxFQUFFLFNBQVUsRUFBQyxJQUFJLEVBQUUsSUFBSyxFQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSyxHQUN4RSxRQUFTLENBQ0gsQ0FBQztvQkFDaEIsQ0FBQztvQkFFRCxNQUFNLENBQUMscUJBQUMsRUFBRSxJQUFDLFNBQVMsRUFBRSxTQUFVLEdBQzVCLHFCQUFDLENBQUMsSUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsR0FDekMsb0JBQUMsY0FBSSxHQUFDLElBQUksRUFBQyxNQUFNLEVBQUcsRUFDcEIscUJBQUMsSUFBSSxJQUFDLEtBQUssRUFBQyxpQkFBaUIsR0FDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFlBQWEsQ0FDdkMsQ0FDUCxFQUNKLG9CQUFDLFdBQUksR0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTLEdBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUNwRSxvQkFBQyxlQUFRLEdBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFLLEVBQUMsU0FBUyxFQUFFLFNBQVUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLFdBQWEsR0FDbkYsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFHLENBQ3JDLENBQ2QsR0FBRyxFQUFHLENBQ0osQ0FDTixDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBaEVELGlEQWdFQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYXNzZW1ibHlMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgU3RhdGUgZnJvbSAnLi4vc3RhdGUnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICcuLi9yZWR1Y3RzJztcblxuaW1wb3J0IHtJY29ufSBmcm9tICcuL3dpZGdldHMnO1xuaW1wb3J0IHtUcmVlLFRyZWVOb2RlfSBmcm9tICcuL2xheW91dC90cmVlJztcblxuQGNvbm5lY3Q8U3RhdGUuQXBwbGljYXRpb24sIElBc3NlbWJseUxpc3RQcm9wcz4oXG4gICAgKHN0YXRlKSA9PiAoeyBhc3NlbWJsaWVzOiBzdGF0ZS5hc3NlbWJseUxpc3QuYXNzZW1ibGllcy50b0FycmF5KCkgfSlcbilcbmV4cG9ydCBjbGFzcyBBc3NlbWJseUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SUFzc2VtYmx5TGlzdFByb3BzLCBhbnk+IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8dWwgY2xhc3NOYW1lPVwibC10cmVlIGMtYXNzZW1ibHlMaXN0XCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5hc3NlbWJsaWVzLm1hcCgoYXNzZW1ibHkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPEFzc2VtYmx5TGlzdEVudHJ5IGtleT17YXNzZW1ibHkucGF0aH0gYXNzZW1ibHk9e2Fzc2VtYmx5fSAvPiAgXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgPC91bD5cbiAgICB9ICAgIFxufVxuXG5leHBvcnQgY2xhc3MgQXNzZW1ibHlMaXN0RW50cnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SUFzc2VtYmx5TGlzdEVudHJ5UHJvcHMsIElBc3NlbWJseUxpc3RFbnRyeVN0YXRlPiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgZXhwYW5kZWQ6IGZhbHNlIH07XG4gICAgfVxuXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZCB9KTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ2wtdHJlZU5vZGUgYy1hc3NlbWJseUxpc3RFbnRyeSc7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFzc2VtYmx5LnN0YXR1cyA9PSBTdGF0ZS5Bc3NlbWJseVN0YXR1cy5Mb2FkaW5nKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gJyBjLWFzc2VtYmx5TGlzdEVudHJ5LWxvYWRpbmcnO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiByZW5kZXJNZW1iZXIobTogU3RhdGUuTWVtYmVyKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW47XG4gICAgICAgICAgICBpZihTdGF0ZS5tZW1iZXJJc1R5cGUobSkpIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IG0ubWVtYmVycy5tYXAocmVuZGVyTWVtYmVyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgaWNvbjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3dpdGNoKG0ua2luZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgU3RhdGUuTWVtYmVyS2luZC5FdmVudDpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9IFwiYXN0ZXJpc2tcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTdGF0ZS5NZW1iZXJLaW5kLkZpZWxkOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gXCJ0YWdcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTdGF0ZS5NZW1iZXJLaW5kLk1ldGhvZDpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9IFwiZmlyZVwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFN0YXRlLk1lbWJlcktpbmQuUHJvcGVydHk6XG4gICAgICAgICAgICAgICAgICAgIGljb24gPSBcImluZm8tc2lnblwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFN0YXRlLk1lbWJlcktpbmQuVHlwZTpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9IFwibGlzdFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIDxUcmVlTm9kZSBrZXk9e20ubmFtZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IGljb249e2ljb259IHRleHQ9e20ubmFtZX0+XG4gICAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgPC9UcmVlTm9kZT47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiA8bGkgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBvbkNsaWNrPXt0aGlzLm9uQ2xpY2suYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgPEljb24gbmFtZT1cImJvb2tcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC10cmVlTm9kZS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmFzc2VtYmx5Lm5hbWUgfHwgXCJMb2FkaW5nLi4uXCJ9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPFRyZWUgZXhwYW5kZWQ9e3RoaXMuc3RhdGUuZXhwYW5kZWR9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmFzc2VtYmx5Lm5hbWVzcGFjZXMgPyB0aGlzLnByb3BzLmFzc2VtYmx5Lm5hbWVzcGFjZXMubWFwKChucykgPT5cbiAgICAgICAgICAgICAgICAgICAgPFRyZWVOb2RlIGtleT17bnMubmFtZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IGljb249XCJnaWZ0XCIgdGV4dD17bnMubmFtZSB8fCBcIjxEZWZhdWx0PlwiIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bnMudHlwZXMgPyBucy50eXBlcy5tYXAocmVuZGVyTWVtYmVyKSA6IFwiXCJ9XG4gICAgICAgICAgICAgICAgICAgIDwvVHJlZU5vZGU+IFxuICAgICAgICAgICAgICAgICkgOiBcIlwifVxuICAgICAgICAgICAgPC9UcmVlPlxuICAgICAgICA8L2xpPjtcbiAgICB9XG59XG5cbmludGVyZmFjZSBJQXNzZW1ibHlMaXN0RW50cnlQcm9wcyB7XG4gICAgYXNzZW1ibHk/OiBTdGF0ZS5Bc3NlbWJseVxufVxuXG5pbnRlcmZhY2UgSUFzc2VtYmx5TGlzdEVudHJ5U3RhdGUge1xuICAgIGV4cGFuZGVkOiBib29sZWFuXG59XG5cbmludGVyZmFjZSBJQXNzZW1ibHlMaXN0UHJvcHMge1xuICAgIGFzc2VtYmxpZXM/OiBTdGF0ZS5Bc3NlbWJseVtdXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
