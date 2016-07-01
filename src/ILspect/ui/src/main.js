System.register(['redux', 'redux-logger', 'redux-thunk', './reducers/app'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var redux_1, redux_logger_1, redux_thunk_1, app_1;
    var logger, Store, store;
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .developmentLogging();
        aurelia.container.registerInstance(Store, store);
        aurelia.start().then(a => a.setRoot('views/app'));
    }
    exports_1("configure", configure);
    return {
        setters:[
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (redux_logger_1_1) {
                redux_logger_1 = redux_logger_1_1;
            },
            function (redux_thunk_1_1) {
                redux_thunk_1 = redux_thunk_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            logger = redux_logger_1.default();
            // Set up Redux store
            class Store {
                constructor() {
                    this.reduxStore = redux_1.createStore(app_1.reducer, redux_1.applyMiddleware(redux_thunk_1.default, logger));
                }
            }
            exports_1("Store", Store);
            store = new Store();
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQVFNLE1BQU0sU0FXTixLQUFLO0lBRVgsbUJBQTBCLE9BQWdCO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHO2FBQ04scUJBQXFCLEVBQUU7YUFDdkIsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixPQUFPLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVqRCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQVJELGlDQVFDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7WUFyQkssTUFBTSxHQUFHLHNCQUFZLEVBQUUsQ0FBQztZQUU5QixxQkFBcUI7WUFDckI7Z0JBQUE7b0JBQ0ksZUFBVSxHQUFHLG1CQUFXLENBQ3BCLGFBQU8sRUFDUCx1QkFBZSxDQUNYLHFCQUFVLEVBQ1YsTUFBTSxDQUFDLENBQXFCLENBQUM7Z0JBQ3pDLENBQUM7WUFBRCxDQUFDO1lBTkQseUJBTUMsQ0FBQTtZQUVLLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsIElTdG9yZX0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tICdyZWR1eC1sb2dnZXInO1xuaW1wb3J0IFJlZHV4VGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHtBdXJlbGlhfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbmltcG9ydCB7QXBwU3RhdGV9IGZyb20gJy4vc3RhdGUvYXBwJztcbmltcG9ydCB7cmVkdWNlcn0gZnJvbSAnLi9yZWR1Y2Vycy9hcHAnO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoKTtcblxuLy8gU2V0IHVwIFJlZHV4IHN0b3JlXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAgIHJlZHV4U3RvcmUgPSBjcmVhdGVTdG9yZTxhbnk+KFxuICAgICAgICByZWR1Y2VyLFxuICAgICAgICBhcHBseU1pZGRsZXdhcmUoXG4gICAgICAgICAgICBSZWR1eFRodW5rLFxuICAgICAgICAgICAgbG9nZ2VyKSkgYXMgSVN0b3JlPEFwcFN0YXRlPjtcbn1cblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShhdXJlbGlhOiBBdXJlbGlhKSB7XG4gICAgYXVyZWxpYS51c2VcbiAgICAgICAgLnN0YW5kYXJkQ29uZmlndXJhdGlvbigpXG4gICAgICAgIC5kZXZlbG9wbWVudExvZ2dpbmcoKTtcblxuICAgIGF1cmVsaWEuY29udGFpbmVyLnJlZ2lzdGVySW5zdGFuY2UoU3RvcmUsIHN0b3JlKTtcblxuICAgIGF1cmVsaWEuc3RhcnQoKS50aGVuKGEgPT4gYS5zZXRSb290KCd2aWV3cy9hcHAnKSk7XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
