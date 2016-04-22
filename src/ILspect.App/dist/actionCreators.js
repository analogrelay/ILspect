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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbkNyZWF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUlBLHVCQUE4QixLQUFlO1FBQ3pDLE1BQU0sQ0FBQyxDQUFPLFFBQXdCO1lBQ2xDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLGtCQUFrQixFQUFFO2dCQUN2QyxNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzlCLENBQUMsQ0FBQztZQUVILG9CQUFvQixDQUFxQjtnQkFDckMsSUFBSSxHQUFHLEdBQWlCO29CQUNwQixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7b0JBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO2lCQUNmLENBQUM7Z0JBRUYsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksR0FBRyxHQUFHLEdBQWlCLENBQUM7b0JBQzVCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ2YsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNmLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUE4QyxDQUFDO1lBQzNFLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBcUI7Z0JBQzFGLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQ25CLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQ25CLE1BQU0sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU07Z0JBQ25DLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBa0I7b0JBQ3pELElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtvQkFDWixLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO2lCQUNqQyxDQUFDLENBQUM7YUFDTixDQUFBLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFBLENBQUM7SUFDTixDQUFDO0lBdkNELHlDQXVDQyxDQUFBIiwiZmlsZSI6ImFjdGlvbkNyZWF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQWN0aW9ucyBmcm9tICcuL2FjdGlvblR5cGVzJztcbmltcG9ydCAqIGFzIFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0ICogYXMgU2VydmVyIGZyb20gJy4vc2VydmVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFzc2VtYmxpZXMocGF0aHM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaDogUmVkdXguRGlzcGF0Y2gpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goQWN0aW9ucy5BZGRpbmdBc3NlbWJseS5jcmVhdGUocGF0aHMpKTtcbiAgICAgICAgbGV0IHJlc3AgPSBhd2FpdCBmZXRjaChcIn4vYXBpL2Fzc2VtYmxpZXNcIiwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXRocylcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiByZWFkTWVtYmVyKG06IFNlcnZlci5NZW1iZXJNb2RlbCk6IFN0YXRlLk1lbWJlciB7XG4gICAgICAgICAgICBsZXQgcmV0OiBTdGF0ZS5NZW1iZXIgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogbS5uYW1lLFxuICAgICAgICAgICAgICAgIGtpbmQ6IG0ua2luZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoU2VydmVyLm1lbWJlcklzVHlwZShtKSkge1xuICAgICAgICAgICAgICAgIGxldCB0eXAgPSByZXQgYXMgU3RhdGUuVHlwZTtcbiAgICAgICAgICAgICAgICB0eXAubWVtYmVycyA9IG0ubWVtYmVycy5tYXAocmVhZE1lbWJlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHJlc3AuanNvbjxTZXJ2ZXIuQXBpUmVzcG9uc2U8U2VydmVyLkFzc2VtYmx5TW9kZWw+W10+KCk7XG4gICAgICAgIGxldCBhc21zID0gcmVzdWx0LmZpbHRlcigocikgPT4gci5zdWNjZXNzICYmIHIucmVzdWx0Lmhhc01ldGFkYXRhKS5tYXAoKHIpID0+IDxTdGF0ZS5Bc3NlbWJseT57XG4gICAgICAgICAgICBwYXRoOiByLnJlc3VsdC5wYXRoLFxuICAgICAgICAgICAgbmFtZTogci5yZXN1bHQubmFtZSxcbiAgICAgICAgICAgIHN0YXR1czogU3RhdGUuQXNzZW1ibHlTdGF0dXMuTG9hZGVkLFxuICAgICAgICAgICAgbmFtZXNwYWNlczogci5yZXN1bHQubmFtZXNwYWNlcy5tYXAoKG4pID0+ICg8U3RhdGUuTmFtZXNwYWNlPntcbiAgICAgICAgICAgICAgICBuYW1lOiBuLm5hbWUsXG4gICAgICAgICAgICAgICAgdHlwZXM6IG4udHlwZXMubWFwKHJlYWRNZW1iZXIpXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBkaXNwYXRjaChBY3Rpb25zLlJlc29sdmVkQXNzZW1ibGllcy5jcmVhdGUoYXNtcykpO1xuICAgIH07XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
