System.register(['./main'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var main_1;
    function redux(context) {
        context = context || {};
        context.noAutoBind = context.noAutoBind || false;
        return (constructor) => {
            let newCtor = function (store, ...rest) {
                let val = constructor.call(this, rest);
                val.__redux_store__ = store.reduxStore;
                val.__redux_context__ = context;
                return val;
            };
            newCtor.prototype = constructor.prototype;
            let existingInject = newCtor.inject || [];
            newCtor.inject = [main_1.Store, ...existingInject];
            return newCtor;
        };
    }
    exports_1("redux", redux);
    function fromState(target, propertyKey) {
    }
    exports_1("fromState", fromState);
    return {
        setters:[
            function (main_1_1) {
                main_1 = main_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtcmVkdXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQVVBLGVBQXNCLE9BQXNCO1FBQ3hDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUM7UUFFakQsTUFBTSxDQUFDLENBQUMsV0FBcUI7WUFDekIsSUFBSSxPQUFPLEdBQVEsVUFBUyxLQUFZLEVBQUUsR0FBRyxJQUFXO2dCQUNwRCxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdkMsR0FBRyxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUN2QyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2YsQ0FBQyxDQUFBO1lBQ0QsT0FBTyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBRTFDLElBQUksY0FBYyxHQUFVLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1lBRWpELE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxZQUFLLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQTtZQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ25CLENBQUMsQ0FBQztJQUNOLENBQUM7SUFsQkQseUJBa0JDLENBQUE7SUFFRCxtQkFBMEIsTUFBVyxFQUFFLFdBQW1CO0lBQzFELENBQUM7SUFERCxpQ0FDQyxDQUFBIiwiZmlsZSI6ImF1cmVsaWEtcmVkdXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwcFN0YXRlfSBmcm9tICcuL3N0YXRlL2FwcCc7XG5pbXBvcnQge1N0b3JlfSBmcm9tICcuL21haW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlZHV4Q29udGV4dCB7XG4gICAgc2VsZWN0b3I/OiAoc3RhdGU6IEFwcFN0YXRlKSA9PiBhbnksXG4gICAgbm9BdXRvQmluZD86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHV4KCk6IChjOiBGdW5jdGlvbikgPT4gYW55O1xuZXhwb3J0IGZ1bmN0aW9uIHJlZHV4KGNvbnRleHQ6IFJlZHV4Q29udGV4dCk6IChjOiBGdW5jdGlvbikgPT4gYW55O1xuZXhwb3J0IGZ1bmN0aW9uIHJlZHV4KGNvbnRleHQ/OiBSZWR1eENvbnRleHQpOiAoYzogRnVuY3Rpb24pID0+IGFueSB7XG4gICAgY29udGV4dCA9IGNvbnRleHQgfHwge307XG4gICAgY29udGV4dC5ub0F1dG9CaW5kID0gY29udGV4dC5ub0F1dG9CaW5kIHx8IGZhbHNlO1xuXG4gICAgcmV0dXJuIChjb25zdHJ1Y3RvcjogRnVuY3Rpb24pOiBhbnkgPT4ge1xuICAgICAgICBsZXQgbmV3Q3RvcjogYW55ID0gZnVuY3Rpb24oc3RvcmU6IFN0b3JlLCAuLi5yZXN0OiBhbnlbXSkge1xuICAgICAgICAgICAgbGV0IHZhbCA9IGNvbnN0cnVjdG9yLmNhbGwodGhpcywgcmVzdCk7XG4gICAgICAgICAgICB2YWwuX19yZWR1eF9zdG9yZV9fID0gc3RvcmUucmVkdXhTdG9yZTtcbiAgICAgICAgICAgIHZhbC5fX3JlZHV4X2NvbnRleHRfXyA9IGNvbnRleHQ7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICAgIG5ld0N0b3IucHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuXG4gICAgICAgIGxldCBleGlzdGluZ0luamVjdDogYW55W10gPSBuZXdDdG9yLmluamVjdCB8fCBbXTtcblxuICAgICAgICBuZXdDdG9yLmluamVjdCA9IFtTdG9yZSwgLi4uZXhpc3RpbmdJbmplY3RdXG4gICAgICAgIHJldHVybiBuZXdDdG9yO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tU3RhdGUodGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcpIHtcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
