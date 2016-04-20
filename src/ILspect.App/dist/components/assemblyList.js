System.register(['react', '../state', '../reducts'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var React, State, reducts_1;
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
            }],
        execute: function() {
            let AssemblyList = class AssemblyList extends React.Component {
                render() {
                    return React.createElement("ul", {className: "c-assemblyList"}, this.props.assemblies.map((assembly) => {
                        return React.createElement(AssemblyListEntry, {key: assembly.path, assembly: assembly});
                    }));
                }
            };
            AssemblyList = __decorate([
                reducts_1.connect((state) => ({ assemblies: state.assemblyList.assemblies.toArray() }))
            ], AssemblyList);
            exports_1("AssemblyList", AssemblyList);
            class AssemblyListEntry extends React.Component {
                render() {
                    var className = 'c-assemblyListEntry';
                    if (this.props.assembly.status == State.AssemblyStatus.Loading) {
                        className += ' c-assemblyListEntry-loading';
                    }
                    return React.createElement("li", {className: className}, React.createElement("span", {className: "glyphicon glyphicon-book"}), React.createElement("span", {className: "c-assemblyListEntry-text"}, this.props.assembly.name || "Loading ..."));
                }
            }
            exports_1("AssemblyListEntry", AssemblyListEntry);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXNzZW1ibHlMaXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU9BLDhDQUFrQyxLQUFLLENBQUMsU0FBUztnQkFDN0MsTUFBTTtvQkFDRixNQUFNLENBQUMscUJBQUMsRUFBRSxJQUFDLFNBQVMsRUFBQyxnQkFBZ0IsR0FDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUTt3QkFDaEMsTUFBTSxDQUFDLG9CQUFDLGlCQUFpQixHQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSyxFQUFDLFFBQVEsRUFBRSxRQUFTLEVBQUcsQ0FBQTtvQkFDeEUsQ0FBQyxDQUFFLENBQ0YsQ0FBQTtnQkFDVCxDQUFDO1lBQ0wsQ0FBQztZQVhEO2dCQUFDLGlCQUFPLENBQ0osQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQ3ZFOzRCQUFBO1lBQ0QsdUNBUUMsQ0FBQTtZQUVELGdDQUF1QyxLQUFLLENBQUMsU0FBUztnQkFDbEQsTUFBTTtvQkFDRixJQUFJLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsU0FBUyxJQUFJLDhCQUE4QixDQUFDO29CQUNoRCxDQUFDO29CQUVELE1BQU0sQ0FBQyxxQkFBQyxFQUFFLElBQUMsU0FBUyxFQUFFLFNBQVUsR0FDNUIscUJBQUMsSUFBSSxJQUFDLFNBQVMsRUFBQywwQkFBMEIsRUFBUSxFQUNsRCxxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFDLDBCQUEwQixHQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksYUFBYyxDQUN4QyxDQUNOLENBQUM7Z0JBQ1YsQ0FBQztZQUNMLENBQUM7WUFkRCxpREFjQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYXNzZW1ibHlMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgU3RhdGUgZnJvbSAnLi4vc3RhdGUnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICcuLi9yZWR1Y3RzJztcblxuQGNvbm5lY3Q8U3RhdGUuQXBwbGljYXRpb24sIElBc3NlbWJseUxpc3RQcm9wcz4oXG4gICAgKHN0YXRlKSA9PiAoeyBhc3NlbWJsaWVzOiBzdGF0ZS5hc3NlbWJseUxpc3QuYXNzZW1ibGllcy50b0FycmF5KCkgfSlcbilcbmV4cG9ydCBjbGFzcyBBc3NlbWJseUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SUFzc2VtYmx5TGlzdFByb3BzLCBhbnk+IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8dWwgY2xhc3NOYW1lPVwiYy1hc3NlbWJseUxpc3RcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmFzc2VtYmxpZXMubWFwKChhc3NlbWJseSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8QXNzZW1ibHlMaXN0RW50cnkga2V5PXthc3NlbWJseS5wYXRofSBhc3NlbWJseT17YXNzZW1ibHl9IC8+ICBcbiAgICAgICAgICAgIH0pfVxuICAgICAgICA8L3VsPlxuICAgIH0gICAgXG59XG5cbmV4cG9ydCBjbGFzcyBBc3NlbWJseUxpc3RFbnRyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJQXNzZW1ibHlMaXN0RW50cnlQcm9wcywgYW55PiB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ2MtYXNzZW1ibHlMaXN0RW50cnknO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5hc3NlbWJseS5zdGF0dXMgPT0gU3RhdGUuQXNzZW1ibHlTdGF0dXMuTG9hZGluZykge1xuICAgICAgICAgICAgY2xhc3NOYW1lICs9ICcgYy1hc3NlbWJseUxpc3RFbnRyeS1sb2FkaW5nJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIDxsaSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWJvb2tcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjLWFzc2VtYmx5TGlzdEVudHJ5LXRleHRcIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5hc3NlbWJseS5uYW1lIHx8IFwiTG9hZGluZyAuLi5cIn1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9saT47XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgSUFzc2VtYmx5TGlzdEVudHJ5UHJvcHMge1xuICAgIGFzc2VtYmx5PzogU3RhdGUuQXNzZW1ibHlcbn1cblxuaW50ZXJmYWNlIElBc3NlbWJseUxpc3RQcm9wcyB7XG4gICAgYXNzZW1ibGllcz86IFN0YXRlLkFzc2VtYmx5W11cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
