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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFPQSxpQkFBd0MsZUFBMEQ7UUFDOUYsTUFBTSxDQUFDLENBQUMsU0FBMEU7WUFDOUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQWdCLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFKRCw2QkFJQyxDQUFBOzs7Ozs7O1lBUUQ7Z0JBQ0ksWUFBbUIsSUFBWSxFQUFTLEtBQUssR0FBWSxLQUFLO29CQUEzQyxTQUFJLEdBQUosSUFBSSxDQUFRO29CQUFTLFVBQUssR0FBTCxLQUFLLENBQWlCO2dCQUFJLENBQUM7Z0JBRW5FLEVBQUUsQ0FBQyxNQUFXO29CQUNWLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLENBQUM7Z0JBRUQsTUFBTSxDQUFDLE9BQVU7b0JBQ2IsTUFBTSxDQUFDO3dCQUNILElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDZixPQUFPLEVBQUUsT0FBTzt3QkFDaEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3FCQUNwQixDQUFBO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBZEQsbUNBY0MsQ0FBQTtZQUVELDhCQUFxQyxVQUFVO2dCQUMzQyxNQUFNO29CQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO1lBQ0wsQ0FBQztZQUpELDZDQUlDLENBQUE7WUFVRDtZQUVBLENBQUM7WUFGRCw2QkFFQyxDQUFBO1lBRUQ7Z0JBQ0ksTUFBTSxDQUFDLEtBQWEsRUFBRSxNQUFXO29CQUM3QixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHO3dCQUMxQixJQUFJLFFBQVEsQ0FBQzt3QkFDYixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDdEIsUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDMUIsQ0FBQzt3QkFDRCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3hELENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JCLENBQUM7WUFDTCxDQUFDO1lBWkQsdUNBWUMsQ0FBQTtZQUVEO2dCQUNJLE1BQU0sQ0FBQyxVQUFpQjtvQkFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDL0MsQ0FBQztZQUNMLENBQUM7WUFKRCxxQ0FJQyxDQUFBIiwiZmlsZSI6InJlZHVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIFJlYWN0UmVkdXggZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5cclxuaW50ZXJmYWNlIElIYXNQcm9wczxUPiB7XHJcbiAgICBwcm9wczogVFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29ubmVjdDxUU3RhdGUsIFRQcm9wcz4obWFwU3RhdGVUb1Byb3BzOiAoc3RhdGU6IFRTdGF0ZSwgb3duUHJvcHM/OiBhbnkpID0+IFRQcm9wcykge1xyXG4gICAgcmV0dXJuIChjb21wb25lbnQ6IFJlYWN0LkNvbXBvbmVudENsYXNzPFRQcm9wcz4gfCBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQ8VFByb3BzPikgPT4ge1xyXG4gICAgICAgIHJldHVybiBSZWFjdFJlZHV4LmNvbm5lY3Q8YW55LCBhbnksIGFueT4obWFwU3RhdGVUb1Byb3BzKShjb21wb25lbnQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb248VD4ge1xyXG4gICAgdHlwZTogc3RyaW5nLFxyXG4gICAgcGF5bG9hZDogVCxcclxuICAgIGVycm9yOiBib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25UeXBlPFQ+IHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBlcnJvcjogYm9vbGVhbiA9IGZhbHNlKSB7IH1cclxuXHJcbiAgICBpcyhhY3Rpb246IGFueSk6IGFjdGlvbiBpcyBJQWN0aW9uPFQ+IHtcclxuICAgICAgICByZXR1cm4gYWN0aW9uLnR5cGUgPT09IHRoaXMubmFtZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY3JlYXRlKHBheWxvYWQ6IFQpOiBJQWN0aW9uPFQ+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXHJcbiAgICAgICAgICAgIGVycm9yOiB0aGlzLmVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW1wdHlBY3Rpb25UeXBlIGV4dGVuZHMgQWN0aW9uVHlwZTx7fT4ge1xyXG4gICAgY3JlYXRlKCk6IElBY3Rpb248e30+IHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuY3JlYXRlKHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlZHVjZXJCYXNlIHtcclxuICAgIHJlZHVjZShzdGF0ZTogYW55LCBhY3Rpb246IGFueSk6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVkdWNlcjxUU3RhdGUsIFRBY3Rpb24+IGV4dGVuZHMgSVJlZHVjZXJCYXNlIHtcclxuICAgIHJlZHVjZShzdGF0ZTogVFN0YXRlLCBhY3Rpb246IFRBY3Rpb24pOiBUU3RhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWR1Y2VyPFRTdGF0ZSwgVFBheWxvYWQ+IGltcGxlbWVudHMgSVJlZHVjZXI8VFN0YXRlLCBJQWN0aW9uPFRQYXlsb2FkPj4ge1xyXG4gICAgYWJzdHJhY3QgcmVkdWNlKHN0YXRlOiBUU3RhdGUsIGFjdGlvbjogSUFjdGlvbjxUUGF5bG9hZD4pOiBUU3RhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNdWx0aVJlZHVjZXI8VFN0YXRlPiBpbXBsZW1lbnRzIElSZWR1Y2VyPFRTdGF0ZSwgYW55PiB7XHJcbiAgICByZWR1Y2Uoc3RhdGU6IFRTdGF0ZSwgYWN0aW9uOiBhbnkpOiBUU3RhdGUge1xyXG4gICAgICAgIGxldCBuZXdfc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSk7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBvbGRTdGF0ZTtcclxuICAgICAgICAgICAgaWYgKHN0YXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG9sZFN0YXRlID0gc3RhdGVba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfc3RhdGVba2V5XSA9IHRoaXNba2V5XS5yZWR1Y2Uob2xkU3RhdGUsIGFjdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld19zdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlT2JqZWN0PFRTZWxmPiB7XHJcbiAgICBtdXRhdGUobmV3X3ZhbHVlczogVFNlbGYpOiBUU2VsZiB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMsIG5ld192YWx1ZXMpO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
