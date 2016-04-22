System.register(['react', '../state', '../reducts', './namespaceList', './widgets'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var React, State, reducts_1, namespaceList_1, widgets_1;
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
            function (namespaceList_1_1) {
                namespaceList_1 = namespaceList_1_1;
            },
            function (widgets_1_1) {
                widgets_1 = widgets_1_1;
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
                    var nsList;
                    if (this.props.assembly.namespaces) {
                        nsList = React.createElement(namespaceList_1.NamespaceList, {namespaces: this.props.assembly.namespaces});
                    }
                    return React.createElement("li", {className: className}, React.createElement(widgets_1.Icon, {name: "menu-right"}), React.createElement(widgets_1.Icon, {name: "book"}), React.createElement("span", {className: "c-assemblyListEntry-text"}, this.props.assembly.name || "Loading ..."), nsList);
                }
            }
            exports_1("AssemblyListEntry", AssemblyListEntry);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXNzZW1ibHlMaXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVdBLDhDQUFrQyxLQUFLLENBQUMsU0FBUztnQkFDN0MsTUFBTTtvQkFDRixNQUFNLENBQUMscUJBQUMsRUFBRSxJQUFDLFNBQVMsRUFBQyxnQkFBZ0IsR0FDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUTt3QkFDaEMsTUFBTSxDQUFDLG9CQUFDLGlCQUFpQixHQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSyxFQUFDLFFBQVEsRUFBRSxRQUFTLEVBQUcsQ0FBQTtvQkFDeEUsQ0FBQyxDQUFFLENBQ0YsQ0FBQTtnQkFDVCxDQUFDO1lBQ0wsQ0FBQztZQVhEO2dCQUFDLGlCQUFPLENBQ0osQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQ3ZFOzRCQUFBO1lBQ0QsdUNBUUMsQ0FBQTtZQUVELGdDQUF1QyxLQUFLLENBQUMsU0FBUztnQkFDbEQsTUFBTTtvQkFDRixJQUFJLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsU0FBUyxJQUFJLDhCQUE4QixDQUFDO29CQUNoRCxDQUFDO29CQUVELElBQUksTUFBTSxDQUFDO29CQUNYLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLE1BQU0sR0FBRyxvQkFBQyw2QkFBYSxHQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFXLEVBQUcsQ0FBQztvQkFDM0UsQ0FBQztvQkFFRCxNQUFNLENBQUMscUJBQUMsRUFBRSxJQUFDLFNBQVMsRUFBRSxTQUFVLEdBQzVCLG9CQUFDLGNBQUksR0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFHLEVBQzFCLG9CQUFDLGNBQUksR0FBQyxJQUFJLEVBQUMsTUFBTSxFQUFHLEVBQ3BCLHFCQUFDLElBQUksSUFBQyxTQUFTLEVBQUMsMEJBQTBCLEdBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxhQUFjLENBQ3hDLEVBQ04sTUFBTyxDQUNQLENBQUM7Z0JBQ1YsQ0FBQztZQUNMLENBQUM7WUFyQkQsaURBcUJDLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9hc3NlbWJseUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBTdGF0ZSBmcm9tICcuLi9zdGF0ZSc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJy4uL3JlZHVjdHMnO1xuXG5pbXBvcnQge05hbWVzcGFjZUxpc3R9IGZyb20gJy4vbmFtZXNwYWNlTGlzdCc7XG5cbmltcG9ydCB7SWNvbn0gZnJvbSAnLi93aWRnZXRzJ1xuXG5AY29ubmVjdDxTdGF0ZS5BcHBsaWNhdGlvbiwgSUFzc2VtYmx5TGlzdFByb3BzPihcbiAgICAoc3RhdGUpID0+ICh7IGFzc2VtYmxpZXM6IHN0YXRlLmFzc2VtYmx5TGlzdC5hc3NlbWJsaWVzLnRvQXJyYXkoKSB9KVxuKVxuZXhwb3J0IGNsYXNzIEFzc2VtYmx5TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJQXNzZW1ibHlMaXN0UHJvcHMsIGFueT4ge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDx1bCBjbGFzc05hbWU9XCJjLWFzc2VtYmx5TGlzdFwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMuYXNzZW1ibGllcy5tYXAoKGFzc2VtYmx5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxBc3NlbWJseUxpc3RFbnRyeSBrZXk9e2Fzc2VtYmx5LnBhdGh9IGFzc2VtYmx5PXthc3NlbWJseX0gLz4gIFxuICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvdWw+XG4gICAgfSAgICBcbn1cblxuZXhwb3J0IGNsYXNzIEFzc2VtYmx5TGlzdEVudHJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElBc3NlbWJseUxpc3RFbnRyeVByb3BzLCBhbnk+IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSAnYy1hc3NlbWJseUxpc3RFbnRyeSc7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFzc2VtYmx5LnN0YXR1cyA9PSBTdGF0ZS5Bc3NlbWJseVN0YXR1cy5Mb2FkaW5nKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gJyBjLWFzc2VtYmx5TGlzdEVudHJ5LWxvYWRpbmcnO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgbnNMaXN0O1xuICAgICAgICBpZih0aGlzLnByb3BzLmFzc2VtYmx5Lm5hbWVzcGFjZXMpIHtcbiAgICAgICAgICAgIG5zTGlzdCA9IDxOYW1lc3BhY2VMaXN0IG5hbWVzcGFjZXM9e3RoaXMucHJvcHMuYXNzZW1ibHkubmFtZXNwYWNlc30gLz47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiA8bGkgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgICAgPEljb24gbmFtZT1cIm1lbnUtcmlnaHRcIiAvPlxuICAgICAgICAgICAgPEljb24gbmFtZT1cImJvb2tcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYy1hc3NlbWJseUxpc3RFbnRyeS10ZXh0XCI+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYXNzZW1ibHkubmFtZSB8fCBcIkxvYWRpbmcgLi4uXCJ9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICB7bnNMaXN0fVxuICAgICAgICA8L2xpPjtcbiAgICB9XG59XG5cbmludGVyZmFjZSBJQXNzZW1ibHlMaXN0RW50cnlQcm9wcyB7XG4gICAgYXNzZW1ibHk/OiBTdGF0ZS5Bc3NlbWJseVxufVxuXG5pbnRlcmZhY2UgSUFzc2VtYmx5TGlzdFByb3BzIHtcbiAgICBhc3NlbWJsaWVzPzogU3RhdGUuQXNzZW1ibHlbXVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
