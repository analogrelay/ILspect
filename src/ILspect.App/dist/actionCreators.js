System.register(['./actionTypes'], function(exports_1, context_1) {
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
    var Actions;
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
            dispatch(Actions.ResolvedAssemblies.create(yield resp.json()));
        });
    }
    exports_1("addAssemblies", addAssemblies);
    return {
        setters:[
            function (Actions_1) {
                Actions = Actions_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbkNyZWF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUdBLHVCQUE4QixLQUFlO1FBQ3pDLE1BQU0sQ0FBQyxDQUFPLFFBQXdCO1lBQ2xDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLGtCQUFrQixFQUFFO2dCQUN2QyxNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzlCLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBb0IsQ0FBQyxDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUFBLENBQUM7SUFDTixDQUFDO0lBWkQseUNBWUMsQ0FBQSIsImZpbGUiOiJhY3Rpb25DcmVhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFjdGlvbnMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgKiBhcyBTdGF0ZSBmcm9tICcuL3N0YXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFzc2VtYmxpZXMocGF0aHM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaDogUmVkdXguRGlzcGF0Y2gpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goQWN0aW9ucy5BZGRpbmdBc3NlbWJseS5jcmVhdGUocGF0aHMpKTtcbiAgICAgICAgbGV0IHJlc3AgPSBhd2FpdCBmZXRjaChcIn4vYXBpL2Fzc2VtYmxpZXNcIiwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXRocylcbiAgICAgICAgfSk7XG4gICAgICAgIGRpc3BhdGNoKEFjdGlvbnMuUmVzb2x2ZWRBc3NlbWJsaWVzLmNyZWF0ZShhd2FpdCByZXNwLmpzb248U3RhdGUuQXNzZW1ibHlbXT4oKSkpO1xuICAgIH07XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
