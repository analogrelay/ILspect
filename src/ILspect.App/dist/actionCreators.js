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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbkNyZWF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUlBLHVCQUE4QixLQUFlO1FBQ3pDLE1BQU0sQ0FBQyxDQUFPLFFBQXdCO1lBQ2xDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLGtCQUFrQixFQUFFO2dCQUN2QyxNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzlCLENBQUMsQ0FBQztZQUVILElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBOEMsQ0FBQztZQUMzRSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQXFCO2dCQUMxRixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dCQUNuQixNQUFNLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNO2dCQUNuQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQWtCO29CQUN6RCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7b0JBQ1osS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQWE7d0JBQ25DLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtxQkFDZixDQUFDLENBQUM7aUJBQ04sQ0FBQyxDQUFDO2FBQ04sQ0FBQSxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQSxDQUFDO0lBQ04sQ0FBQztJQTFCRCx5Q0EwQkMsQ0FBQSIsImZpbGUiOiJhY3Rpb25DcmVhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFjdGlvbnMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XHJcbmltcG9ydCAqIGFzIFN0YXRlIGZyb20gJy4vc3RhdGUnO1xyXG5pbXBvcnQgKiBhcyBTZXJ2ZXIgZnJvbSAnLi9zZXJ2ZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFzc2VtYmxpZXMocGF0aHM6IHN0cmluZ1tdKSB7XHJcbiAgICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoOiBSZWR1eC5EaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoKEFjdGlvbnMuQWRkaW5nQXNzZW1ibHkuY3JlYXRlKHBhdGhzKSk7XHJcbiAgICAgICAgbGV0IHJlc3AgPSBhd2FpdCBmZXRjaChcIn4vYXBpL2Fzc2VtYmxpZXNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF0aHMpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHJlc3AuanNvbjxTZXJ2ZXIuQXBpUmVzcG9uc2U8U2VydmVyLkFzc2VtYmx5TW9kZWw+W10+KCk7XHJcbiAgICAgICAgbGV0IGFzbXMgPSByZXN1bHQuZmlsdGVyKChyKSA9PiByLnN1Y2Nlc3MgJiYgci5yZXN1bHQuaGFzTWV0YWRhdGEpLm1hcCgocikgPT4gPFN0YXRlLkFzc2VtYmx5PntcclxuICAgICAgICAgICAgcGF0aDogci5yZXN1bHQucGF0aCxcclxuICAgICAgICAgICAgbmFtZTogci5yZXN1bHQubmFtZSxcclxuICAgICAgICAgICAgc3RhdHVzOiBTdGF0ZS5Bc3NlbWJseVN0YXR1cy5Mb2FkZWQsXHJcbiAgICAgICAgICAgIG5hbWVzcGFjZXM6IHIucmVzdWx0Lm5hbWVzcGFjZXMubWFwKChuKSA9PiAoPFN0YXRlLk5hbWVzcGFjZT57XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuLm5hbWUsXHJcbiAgICAgICAgICAgICAgICB0eXBlczogbi50eXBlcy5tYXAoKHQpID0+ICg8U3RhdGUuVHlwZT57XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdC5uYW1lXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGlzcGF0Y2goQWN0aW9ucy5SZXNvbHZlZEFzc2VtYmxpZXMuY3JlYXRlKGFzbXMpKTtcclxuICAgIH07XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
