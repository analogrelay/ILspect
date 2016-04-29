System.register(['./actionTypes', './state', './server'], function(exports_1, context_1) {
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
    var Actions, State, Server;
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
            function readMember(m) {
                let ret = {
                    name: m.name,
                    kind: m.kind
                };
                if (Server.memberIsType(m)) {
                    let typ = ret;
                    typ.members = m.members.map(readMember);
                    return typ;
                }
                else {
                    return ret;
                }
            }
            let result = yield resp.json();
            let asms = result.filter((r) => r.success && r.result.hasMetadata).map((r) => ({
                path: r.result.path,
                name: r.result.name,
                status: State.AssemblyStatus.Loaded,
                namespaces: r.result.namespaces.map((n) => ({
                    name: n.name,
                    types: n.types.map(readMember)
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
            },
            function (Server_1) {
                Server = Server_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbkNyZWF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUlBLHVCQUE4QixLQUFlO1FBQ3pDLE1BQU0sQ0FBQyxDQUFPLFFBQXdCO1lBQ2xDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLGtCQUFrQixFQUFFO2dCQUN2QyxNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzlCLENBQUMsQ0FBQztZQUVILG9CQUFvQixDQUFxQjtnQkFDckMsSUFBSSxHQUFHLEdBQWlCO29CQUNwQixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7b0JBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO2lCQUNmLENBQUM7Z0JBRUYsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksR0FBRyxHQUFHLEdBQWlCLENBQUM7b0JBQzVCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ2YsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNmLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUE4QyxDQUFDO1lBQzNFLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBcUI7Z0JBQzFGLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQ25CLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQ25CLE1BQU0sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU07Z0JBQ25DLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBa0I7b0JBQ3pELElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtvQkFDWixLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO2lCQUNqQyxDQUFDLENBQUM7YUFDTixDQUFBLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFBLENBQUM7SUFDTixDQUFDO0lBdkNELHlDQXVDQyxDQUFBIiwiZmlsZSI6ImFjdGlvbkNyZWF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQWN0aW9ucyBmcm9tICcuL2FjdGlvblR5cGVzJztcclxuaW1wb3J0ICogYXMgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XHJcbmltcG9ydCAqIGFzIFNlcnZlciBmcm9tICcuL3NlcnZlcic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQXNzZW1ibGllcyhwYXRoczogc3RyaW5nW10pIHtcclxuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2g6IFJlZHV4LkRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2goQWN0aW9ucy5BZGRpbmdBc3NlbWJseS5jcmVhdGUocGF0aHMpKTtcclxuICAgICAgICBsZXQgcmVzcCA9IGF3YWl0IGZldGNoKFwifi9hcGkvYXNzZW1ibGllc1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXRocylcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiByZWFkTWVtYmVyKG06IFNlcnZlci5NZW1iZXJNb2RlbCk6IFN0YXRlLk1lbWJlciB7XHJcbiAgICAgICAgICAgIGxldCByZXQ6IFN0YXRlLk1lbWJlciA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG0ubmFtZSxcclxuICAgICAgICAgICAgICAgIGtpbmQ6IG0ua2luZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoU2VydmVyLm1lbWJlcklzVHlwZShtKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cCA9IHJldCBhcyBTdGF0ZS5UeXBlO1xyXG4gICAgICAgICAgICAgICAgdHlwLm1lbWJlcnMgPSBtLm1lbWJlcnMubWFwKHJlYWRNZW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHJlc3AuanNvbjxTZXJ2ZXIuQXBpUmVzcG9uc2U8U2VydmVyLkFzc2VtYmx5TW9kZWw+W10+KCk7XHJcbiAgICAgICAgbGV0IGFzbXMgPSByZXN1bHQuZmlsdGVyKChyKSA9PiByLnN1Y2Nlc3MgJiYgci5yZXN1bHQuaGFzTWV0YWRhdGEpLm1hcCgocikgPT4gPFN0YXRlLkFzc2VtYmx5PntcclxuICAgICAgICAgICAgcGF0aDogci5yZXN1bHQucGF0aCxcclxuICAgICAgICAgICAgbmFtZTogci5yZXN1bHQubmFtZSxcclxuICAgICAgICAgICAgc3RhdHVzOiBTdGF0ZS5Bc3NlbWJseVN0YXR1cy5Mb2FkZWQsXHJcbiAgICAgICAgICAgIG5hbWVzcGFjZXM6IHIucmVzdWx0Lm5hbWVzcGFjZXMubWFwKChuKSA9PiAoPFN0YXRlLk5hbWVzcGFjZT57XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuLm5hbWUsXHJcbiAgICAgICAgICAgICAgICB0eXBlczogbi50eXBlcy5tYXAocmVhZE1lbWJlcilcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGlzcGF0Y2goQWN0aW9ucy5SZXNvbHZlZEFzc2VtYmxpZXMuY3JlYXRlKGFzbXMpKTtcclxuICAgIH07XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
