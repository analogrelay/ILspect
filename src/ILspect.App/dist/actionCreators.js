System.register(['./actionTypes', './state'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments)).next());
        });
    };
    var Actions, State;
    function addAssemblies(paths) {
        return (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch(Actions.AddingAssembly.create(paths));
            let resp = yield fetch("~/api/assemblies", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paths)
            });
            let result = yield resp.json();
            let asms = result.filter((r) => r.success && r.result.hasMetadata).map((r) => ({
                path: r.result.path,
                name: r.result.name,
                status: State.AssemblyStatus.Loaded
            }));
            dispatch(Actions.ResolvedAssemblies.create(asms));
        });
    }
    exports_1("addAssemblies", addAssemblies);
    return {
        setters:[
            function (Actions_1) {
                Actions = Actions_1;
            },
            function (State_1) {
                State = State_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbkNyZWF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUlBLHVCQUE4QixLQUFlO1FBQ3pDLE1BQU0sQ0FBQyxDQUFPLFFBQXdCO1lBQ2xDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLGtCQUFrQixFQUFFO2dCQUN2QyxNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzlCLENBQUMsQ0FBQztZQUVILElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBOEMsQ0FBQztZQUMzRSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQXFCO2dCQUMxRixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dCQUNuQixNQUFNLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNO2FBQ3RDLENBQUEsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUEsQ0FBQztJQUNOLENBQUM7SUFwQkQseUNBb0JDLENBQUEiLCJmaWxlIjoiYWN0aW9uQ3JlYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJy4vYWN0aW9uVHlwZXMnO1xuaW1wb3J0ICogYXMgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgKiBhcyBTZXJ2ZXIgZnJvbSAnLi9zZXJ2ZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQXNzZW1ibGllcyhwYXRoczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoOiBSZWR1eC5EaXNwYXRjaCkgPT4ge1xuICAgICAgICBkaXNwYXRjaChBY3Rpb25zLkFkZGluZ0Fzc2VtYmx5LmNyZWF0ZShwYXRocykpO1xuICAgICAgICBsZXQgcmVzcCA9IGF3YWl0IGZldGNoKFwifi9hcGkvYXNzZW1ibGllc1wiLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhdGhzKVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCByZXNwLmpzb248U2VydmVyLkFwaVJlc3BvbnNlPFNlcnZlci5Bc3NlbWJseU1vZGVsPltdPigpO1xuICAgICAgICBsZXQgYXNtcyA9IHJlc3VsdC5maWx0ZXIoKHIpID0+IHIuc3VjY2VzcyAmJiByLnJlc3VsdC5oYXNNZXRhZGF0YSkubWFwKChyKSA9PiA8U3RhdGUuQXNzZW1ibHk+e1xuICAgICAgICAgICAgcGF0aDogci5yZXN1bHQucGF0aCxcbiAgICAgICAgICAgIG5hbWU6IHIucmVzdWx0Lm5hbWUsXG4gICAgICAgICAgICBzdGF0dXM6IFN0YXRlLkFzc2VtYmx5U3RhdHVzLkxvYWRlZFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGRpc3BhdGNoKEFjdGlvbnMuUmVzb2x2ZWRBc3NlbWJsaWVzLmNyZWF0ZShhc21zKSk7XG4gICAgfTtcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
