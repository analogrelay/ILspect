System.register(['immutable', '../reducts', '../state', '../actionTypes', '../utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Immutable, reducts_1, State, Actions, utils_1;
    var initialState, AssemblyListReducer;
    return {
        setters:[
            function (Immutable_1) {
                Immutable = Immutable_1;
            },
            function (reducts_1_1) {
                reducts_1 = reducts_1_1;
            },
            function (State_1) {
                State = State_1;
            },
            function (Actions_1) {
                Actions = Actions_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            initialState = {
                assemblies: Immutable.List()
            };
            class AssemblyListReducer extends reducts_1.Reducer {
                reduce(state = initialState, action) {
                    if (Actions.AddingAssembly.is(action)) {
                        return utils_1.mut(state, {
                            assemblies: state.assemblies.withMutations((assemblies) => {
                                action.payload.forEach(path => {
                                    let existing = assemblies.findIndex((v) => v.path === path);
                                    if (existing == -1) {
                                        assemblies.push({
                                            name: null,
                                            path: path,
                                            status: State.AssemblyStatus.Loading
                                        });
                                    }
                                });
                            })
                        });
                    }
                    else if (Actions.ResolvedAssemblies.is(action)) {
                        return utils_1.mut(state, {
                            assemblies: state.assemblies.withMutations((assemblies) => {
                                action.payload.forEach(a => {
                                    let existing = assemblies.findIndex((v) => v.path === a.path);
                                    if (existing >= 0) {
                                        assemblies.set(existing, utils_1.mut(a, { status: State.AssemblyStatus.Loaded }));
                                    }
                                });
                            })
                        });
                    }
                    else {
                        return state;
                    }
                }
            }
            exports_1("AssemblyListReducer", AssemblyListReducer);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHVjZXJzL2Fzc2VtYmx5TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBUUksWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBd0I7Z0JBQ3BDLFVBQVUsRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFrQjthQUMvQyxDQUFBO1lBRUQsa0NBQXlDLGlCQUFPO2dCQUM1QyxNQUFNLENBQUMsS0FBSyxHQUF1QixZQUFZLEVBQUUsTUFBb0I7b0JBQ2pFLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsTUFBTSxDQUFDLFdBQUcsQ0FBQyxLQUFLLEVBQUU7NEJBQ2QsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVTtnQ0FDbEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSTtvQ0FDdkIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO29DQUM1RCxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUNqQixVQUFVLENBQUMsSUFBSSxDQUFDOzRDQUNaLElBQUksRUFBRSxJQUFJOzRDQUNWLElBQUksRUFBRSxJQUFJOzRDQUNWLE1BQU0sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU87eUNBQ3ZDLENBQUMsQ0FBQztvQ0FDUCxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFDOzRCQUNQLENBQUMsQ0FBQzt5QkFDSixDQUFDLENBQUM7b0JBQ1IsQ0FBQztvQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVDLE1BQU0sQ0FBQyxXQUFHLENBQUMsS0FBSyxFQUFFOzRCQUNkLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVU7Z0NBQ2xELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0NBQ3BCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0NBQzlELEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUNoQixVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO29DQUM5RSxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFBOzRCQUNOLENBQUMsQ0FBQzt5QkFDTCxDQUFDLENBQUM7b0JBQ1AsQ0FBQztvQkFDRCxJQUFJLENBQUMsQ0FBQzt3QkFDRixNQUFNLENBQUMsS0FBSyxDQUFDO29CQUNqQixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBbENELHFEQWtDQyxDQUFBIiwiZmlsZSI6InJlZHVjZXJzL2Fzc2VtYmx5TGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xyXG5cclxuaW1wb3J0IHtSZWR1Y2VyLElBY3Rpb259IGZyb20gJy4uL3JlZHVjdHMnO1xyXG5cclxuaW1wb3J0ICogYXMgU3RhdGUgZnJvbSAnLi4vc3RhdGUnO1xyXG5pbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJy4uL2FjdGlvblR5cGVzJ1xyXG5pbXBvcnQge211dH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxubGV0IGluaXRpYWxTdGF0ZSA6IFN0YXRlLkFzc2VtYmx5TGlzdCA9IHtcclxuICAgIGFzc2VtYmxpZXM6IEltbXV0YWJsZS5MaXN0PFN0YXRlLkFzc2VtYmx5PigpXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBc3NlbWJseUxpc3RSZWR1Y2VyIGV4dGVuZHMgUmVkdWNlcjxTdGF0ZS5Bc3NlbWJseUxpc3QsIGFueT4ge1xyXG4gICAgcmVkdWNlKHN0YXRlOiBTdGF0ZS5Bc3NlbWJseUxpc3QgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogSUFjdGlvbjxhbnk+KTogU3RhdGUuQXNzZW1ibHlMaXN0IHtcclxuICAgICAgICBpZihBY3Rpb25zLkFkZGluZ0Fzc2VtYmx5LmlzKGFjdGlvbikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG11dChzdGF0ZSwgeyBcclxuICAgICAgICAgICAgICAgIGFzc2VtYmxpZXM6IHN0YXRlLmFzc2VtYmxpZXMud2l0aE11dGF0aW9ucygoYXNzZW1ibGllcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5wYXlsb2FkLmZvckVhY2gocGF0aCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleGlzdGluZyA9IGFzc2VtYmxpZXMuZmluZEluZGV4KCh2KSA9PiB2LnBhdGggPT09IHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmcgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VtYmxpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogU3RhdGUuQXNzZW1ibHlTdGF0dXMuTG9hZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihBY3Rpb25zLlJlc29sdmVkQXNzZW1ibGllcy5pcyhhY3Rpb24pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtdXQoc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGFzc2VtYmxpZXM6IHN0YXRlLmFzc2VtYmxpZXMud2l0aE11dGF0aW9ucygoYXNzZW1ibGllcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5wYXlsb2FkLmZvckVhY2goYSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleGlzdGluZyA9IGFzc2VtYmxpZXMuZmluZEluZGV4KCh2KSA9PiB2LnBhdGggPT09IGEucGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZyA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlbWJsaWVzLnNldChleGlzdGluZywgbXV0KGEsIHsgc3RhdHVzOiBTdGF0ZS5Bc3NlbWJseVN0YXR1cy5Mb2FkZWQgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
