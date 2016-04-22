System.register(['react-redux'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ReactRedux;
    var ActionType, EmptyActionType, Reducer, MultiReducer, StateObject;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFPQSxpQkFBd0MsZUFBMEQ7UUFDOUYsTUFBTSxDQUFDLENBQUMsU0FBMEU7WUFDOUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQWdCLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFKRCw2QkFJQyxDQUFBOzs7Ozs7O1lBUUQ7Z0JBQ0ksWUFBbUIsSUFBWSxFQUFTLEtBQUssR0FBWSxLQUFLO29CQUEzQyxTQUFJLEdBQUosSUFBSSxDQUFRO29CQUFTLFVBQUssR0FBTCxLQUFLLENBQWlCO2dCQUFJLENBQUM7Z0JBRW5FLEVBQUUsQ0FBQyxNQUFXO29CQUNWLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLENBQUM7Z0JBRUQsTUFBTSxDQUFDLE9BQVU7b0JBQ2IsTUFBTSxDQUFDO3dCQUNILElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDZixPQUFPLEVBQUUsT0FBTzt3QkFDaEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3FCQUNwQixDQUFBO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBZEQsbUNBY0MsQ0FBQTtZQUVELDhCQUFxQyxVQUFVO2dCQUMzQyxNQUFNO29CQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO1lBQ0wsQ0FBQztZQUpELDZDQUlDLENBQUE7WUFVRDtZQUVBLENBQUM7WUFGRCw2QkFFQyxDQUFBO1lBRUQ7Z0JBQ0ksTUFBTSxDQUFDLEtBQWEsRUFBRSxNQUFXO29CQUM3QixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHO3dCQUMxQixJQUFJLFFBQVEsQ0FBQzt3QkFDYixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDdEIsUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDMUIsQ0FBQzt3QkFDRCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3hELENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JCLENBQUM7WUFDTCxDQUFDO1lBWkQsdUNBWUMsQ0FBQTtZQUVEO2dCQUNJLE1BQU0sQ0FBQyxVQUFpQjtvQkFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDL0MsQ0FBQztZQUNMLENBQUM7WUFKRCxxQ0FJQyxDQUFBIiwiZmlsZSI6InJlZHVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdFJlZHV4IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW50ZXJmYWNlIElIYXNQcm9wczxUPiB7XG4gICAgcHJvcHM6IFRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3Q8VFN0YXRlLCBUUHJvcHM+KG1hcFN0YXRlVG9Qcm9wczogKHN0YXRlOiBUU3RhdGUsIG93blByb3BzPzogYW55KSA9PiBUUHJvcHMpIHtcbiAgICByZXR1cm4gKGNvbXBvbmVudDogUmVhY3QuQ29tcG9uZW50Q2xhc3M8VFByb3BzPiB8IFJlYWN0LlN0YXRlbGVzc0NvbXBvbmVudDxUUHJvcHM+KSA9PiB7XG4gICAgICAgIHJldHVybiBSZWFjdFJlZHV4LmNvbm5lY3Q8YW55LCBhbnksIGFueT4obWFwU3RhdGVUb1Byb3BzKShjb21wb25lbnQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uPFQ+IHtcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgcGF5bG9hZDogVCxcbiAgICBlcnJvcjogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uVHlwZTxUPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGVycm9yOiBib29sZWFuID0gZmFsc2UpIHsgfVxuXG4gICAgaXMoYWN0aW9uOiBhbnkpOiBhY3Rpb24gaXMgSUFjdGlvbjxUPiB7XG4gICAgICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gdGhpcy5uYW1lO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUocGF5bG9hZDogVCk6IElBY3Rpb248VD4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgICAgIGVycm9yOiB0aGlzLmVycm9yXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbXB0eUFjdGlvblR5cGUgZXh0ZW5kcyBBY3Rpb25UeXBlPHt9PiB7XG4gICAgY3JlYXRlKCk6IElBY3Rpb248e30+IHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmNyZWF0ZSh1bmRlZmluZWQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVkdWNlckJhc2Uge1xuICAgIHJlZHVjZShzdGF0ZTogYW55LCBhY3Rpb246IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVkdWNlcjxUU3RhdGUsIFRBY3Rpb24+IGV4dGVuZHMgSVJlZHVjZXJCYXNlIHtcbiAgICByZWR1Y2Uoc3RhdGU6IFRTdGF0ZSwgYWN0aW9uOiBUQWN0aW9uKTogVFN0YXRlO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVkdWNlcjxUU3RhdGUsIFRQYXlsb2FkPiBpbXBsZW1lbnRzIElSZWR1Y2VyPFRTdGF0ZSwgSUFjdGlvbjxUUGF5bG9hZD4+IHtcbiAgICBhYnN0cmFjdCByZWR1Y2Uoc3RhdGU6IFRTdGF0ZSwgYWN0aW9uOiBJQWN0aW9uPFRQYXlsb2FkPik6IFRTdGF0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpUmVkdWNlcjxUU3RhdGU+IGltcGxlbWVudHMgSVJlZHVjZXI8VFN0YXRlLCBhbnk+IHtcbiAgICByZWR1Y2Uoc3RhdGU6IFRTdGF0ZSwgYWN0aW9uOiBhbnkpOiBUU3RhdGUge1xuICAgICAgICBsZXQgbmV3X3N0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCBvbGRTdGF0ZTtcbiAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb2xkU3RhdGUgPSBzdGF0ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3X3N0YXRlW2tleV0gPSB0aGlzW2tleV0ucmVkdWNlKG9sZFN0YXRlLCBhY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld19zdGF0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGF0ZU9iamVjdDxUU2VsZj4ge1xuICAgIG11dGF0ZShuZXdfdmFsdWVzOiBUU2VsZik6IFRTZWxmIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMsIG5ld192YWx1ZXMpO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
