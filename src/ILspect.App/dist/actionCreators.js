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
                status: State.AssemblyStatus.Loaded,
                namespaces: r.result.namespaces.map((n) => ({
                    name: n.name,
                    types: n.types.map((t) => ({
                        name: t.name
                    }))
                }))
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbkNyZWF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUlBLHVCQUE4QixLQUFlO1FBQ3pDLE1BQU0sQ0FBQyxDQUFPLFFBQXdCO1lBQ2xDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLGtCQUFrQixFQUFFO2dCQUN2QyxNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzlCLENBQUMsQ0FBQztZQUVILElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBOEMsQ0FBQztZQUMzRSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQXFCO2dCQUMxRixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dCQUNuQixNQUFNLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNO2dCQUNuQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQWtCO29CQUN6RCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7b0JBQ1osS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQWE7d0JBQ25DLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtxQkFDZixDQUFDLENBQUM7aUJBQ04sQ0FBQyxDQUFDO2FBQ04sQ0FBQSxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQSxDQUFDO0lBQ04sQ0FBQztJQTFCRCx5Q0EwQkMsQ0FBQSIsImZpbGUiOiJhY3Rpb25DcmVhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFjdGlvbnMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgKiBhcyBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCAqIGFzIFNlcnZlciBmcm9tICcuL3NlcnZlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBc3NlbWJsaWVzKHBhdGhzOiBzdHJpbmdbXSkge1xuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2g6IFJlZHV4LkRpc3BhdGNoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKEFjdGlvbnMuQWRkaW5nQXNzZW1ibHkuY3JlYXRlKHBhdGhzKSk7XG4gICAgICAgIGxldCByZXNwID0gYXdhaXQgZmV0Y2goXCJ+L2FwaS9hc3NlbWJsaWVzXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF0aHMpXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHJlc3AuanNvbjxTZXJ2ZXIuQXBpUmVzcG9uc2U8U2VydmVyLkFzc2VtYmx5TW9kZWw+W10+KCk7XG4gICAgICAgIGxldCBhc21zID0gcmVzdWx0LmZpbHRlcigocikgPT4gci5zdWNjZXNzICYmIHIucmVzdWx0Lmhhc01ldGFkYXRhKS5tYXAoKHIpID0+IDxTdGF0ZS5Bc3NlbWJseT57XG4gICAgICAgICAgICBwYXRoOiByLnJlc3VsdC5wYXRoLFxuICAgICAgICAgICAgbmFtZTogci5yZXN1bHQubmFtZSxcbiAgICAgICAgICAgIHN0YXR1czogU3RhdGUuQXNzZW1ibHlTdGF0dXMuTG9hZGVkLFxuICAgICAgICAgICAgbmFtZXNwYWNlczogci5yZXN1bHQubmFtZXNwYWNlcy5tYXAoKG4pID0+ICg8U3RhdGUuTmFtZXNwYWNlPntcbiAgICAgICAgICAgICAgICBuYW1lOiBuLm5hbWUsXG4gICAgICAgICAgICAgICAgdHlwZXM6IG4udHlwZXMubWFwKCh0KSA9PiAoPFN0YXRlLlR5cGU+e1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0Lm5hbWVcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pKVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGRpc3BhdGNoKEFjdGlvbnMuUmVzb2x2ZWRBc3NlbWJsaWVzLmNyZWF0ZShhc21zKSk7XG4gICAgfTtcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
