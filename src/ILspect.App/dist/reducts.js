System.register(['react-redux'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ReactRedux;
    var ActionType, EmptyActionType, Reducer, MultiReducer, StateObject;
    function isComponent(e, ctor) {
        return e.type === ctor;
    }
    exports_1("isComponent", isComponent);
    function connect(mapStateToProps) {
        return (component) => {
            return ReactRedux.connect(mapStateToProps)(component);
        };
    }
    exports_1("connect", connect);
    return {
        setters:[
            function (ReactRedux_1) {
                ReactRedux = ReactRedux_1;
            }],
        execute: function() {
            class ActionType {
                constructor(name, error = false) {
                    this.name = name;
                    this.error = error;
                }
                is(action) {
                    return action.type === this.name;
                }
                create(payload) {
                    return {
                        type: this.name,
                        payload: payload,
                        error: this.error
                    };
                }
            }
            exports_1("ActionType", ActionType);
            class EmptyActionType extends ActionType {
                create() {
                    return super.create(undefined);
                }
            }
            exports_1("EmptyActionType", EmptyActionType);
            class Reducer {
            }
            exports_1("Reducer", Reducer);
            class MultiReducer {
                reduce(state, action) {
                    let new_state = Object.assign({}, state);
                    Object.keys(this).forEach((key) => {
                        let oldState;
                        if (state !== undefined) {
                            oldState = state[key];
                        }
                        new_state[key] = this[key].reduce(oldState, action);
                    });
                    return new_state;
                }
            }
            exports_1("MultiReducer", MultiReducer);
            class StateObject {
                mutate(new_values) {
                    return Object.assign({}, this, new_values);
                }
            }
            exports_1("StateObject", StateObject);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFPQSxxQkFBdUQsQ0FBMEIsRUFBRSxJQUFhO1FBQzVGLE1BQU0sQ0FBRSxDQUFDLENBQUMsSUFBWSxLQUFLLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBRkQscUNBRUMsQ0FBQTtJQUVELGlCQUF3QyxlQUEwRDtRQUM5RixNQUFNLENBQUMsQ0FBQyxTQUEwRTtZQUM5RSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBZ0IsZUFBZSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUpELDZCQUlDLENBQUE7Ozs7Ozs7WUFRRDtnQkFDSSxZQUFtQixJQUFZLEVBQVMsS0FBSyxHQUFZLEtBQUs7b0JBQTNDLFNBQUksR0FBSixJQUFJLENBQVE7b0JBQVMsVUFBSyxHQUFMLEtBQUssQ0FBaUI7Z0JBQUksQ0FBQztnQkFFbkUsRUFBRSxDQUFDLE1BQVc7b0JBQ1YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDckMsQ0FBQztnQkFFRCxNQUFNLENBQUMsT0FBVTtvQkFDYixNQUFNLENBQUM7d0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO3dCQUNmLE9BQU8sRUFBRSxPQUFPO3dCQUNoQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7cUJBQ3BCLENBQUE7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFkRCxtQ0FjQyxDQUFBO1lBRUQsOEJBQXFDLFVBQVU7Z0JBQzNDLE1BQU07b0JBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25DLENBQUM7WUFDTCxDQUFDO1lBSkQsNkNBSUMsQ0FBQTtZQVVEO1lBRUEsQ0FBQztZQUZELDZCQUVDLENBQUE7WUFFRDtnQkFDSSxNQUFNLENBQUMsS0FBYSxFQUFFLE1BQVc7b0JBQzdCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUc7d0JBQzFCLElBQUksUUFBUSxDQUFDO3dCQUNiLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUN0QixRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUMxQixDQUFDO3dCQUNELFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDeEQsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDckIsQ0FBQztZQUNMLENBQUM7WUFaRCx1Q0FZQyxDQUFBO1lBRUQ7Z0JBQ0ksTUFBTSxDQUFDLFVBQWlCO29CQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDO1lBQ0wsQ0FBQztZQUpELHFDQUlDLENBQUEiLCJmaWxlIjoicmVkdWN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0UmVkdXggZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbnRlcmZhY2UgSUhhc1Byb3BzPFQ+IHtcbiAgICBwcm9wczogVFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21wb25lbnQ8VCBleHRlbmRzIElIYXNQcm9wczxQPiwgUD4oZTogUmVhY3QuUmVhY3RFbGVtZW50PGFueT4sIGN0b3I6ICgpID0+IFQpOiBlIGlzIFJlYWN0LlJlYWN0RWxlbWVudDxQPiB7XG4gICAgcmV0dXJuIChlLnR5cGUgYXMgYW55KSA9PT0gY3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3Q8VFN0YXRlLCBUUHJvcHM+KG1hcFN0YXRlVG9Qcm9wczogKHN0YXRlOiBUU3RhdGUsIG93blByb3BzPzogYW55KSA9PiBUUHJvcHMpIHtcbiAgICByZXR1cm4gKGNvbXBvbmVudDogUmVhY3QuQ29tcG9uZW50Q2xhc3M8VFByb3BzPiB8IFJlYWN0LlN0YXRlbGVzc0NvbXBvbmVudDxUUHJvcHM+KSA9PiB7XG4gICAgICAgIHJldHVybiBSZWFjdFJlZHV4LmNvbm5lY3Q8YW55LCBhbnksIGFueT4obWFwU3RhdGVUb1Byb3BzKShjb21wb25lbnQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uPFQ+IHtcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgcGF5bG9hZDogVCxcbiAgICBlcnJvcjogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uVHlwZTxUPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGVycm9yOiBib29sZWFuID0gZmFsc2UpIHsgfVxuXG4gICAgaXMoYWN0aW9uOiBhbnkpOiBhY3Rpb24gaXMgSUFjdGlvbjxUPiB7XG4gICAgICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gdGhpcy5uYW1lO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUocGF5bG9hZDogVCk6IElBY3Rpb248VD4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgICAgIGVycm9yOiB0aGlzLmVycm9yXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbXB0eUFjdGlvblR5cGUgZXh0ZW5kcyBBY3Rpb25UeXBlPHt9PiB7XG4gICAgY3JlYXRlKCk6IElBY3Rpb248e30+IHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmNyZWF0ZSh1bmRlZmluZWQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVkdWNlckJhc2Uge1xuICAgIHJlZHVjZShzdGF0ZTogYW55LCBhY3Rpb246IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVkdWNlcjxUU3RhdGUsIFRBY3Rpb24+IGV4dGVuZHMgSVJlZHVjZXJCYXNlIHtcbiAgICByZWR1Y2Uoc3RhdGU6IFRTdGF0ZSwgYWN0aW9uOiBUQWN0aW9uKTogVFN0YXRlO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVkdWNlcjxUU3RhdGUsIFRQYXlsb2FkPiBpbXBsZW1lbnRzIElSZWR1Y2VyPFRTdGF0ZSwgSUFjdGlvbjxUUGF5bG9hZD4+IHtcbiAgICBhYnN0cmFjdCByZWR1Y2Uoc3RhdGU6IFRTdGF0ZSwgYWN0aW9uOiBJQWN0aW9uPFRQYXlsb2FkPik6IFRTdGF0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpUmVkdWNlcjxUU3RhdGU+IGltcGxlbWVudHMgSVJlZHVjZXI8VFN0YXRlLCBhbnk+IHtcbiAgICByZWR1Y2Uoc3RhdGU6IFRTdGF0ZSwgYWN0aW9uOiBhbnkpOiBUU3RhdGUge1xuICAgICAgICBsZXQgbmV3X3N0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCBvbGRTdGF0ZTtcbiAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb2xkU3RhdGUgPSBzdGF0ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3X3N0YXRlW2tleV0gPSB0aGlzW2tleV0ucmVkdWNlKG9sZFN0YXRlLCBhY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld19zdGF0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGF0ZU9iamVjdDxUU2VsZj4ge1xuICAgIG11dGF0ZShuZXdfdmFsdWVzOiBUU2VsZik6IFRTZWxmIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMsIG5ld192YWx1ZXMpO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
