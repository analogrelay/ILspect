System.register(['react', 'react-dom', 'electron', 'redux', 'react-redux', 'redux-thunk', './reducers/app', './components/root', './actionCreators'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React, ReactDOM, electron, redux_1, react_redux_1, Thunk, app_1, root_1, actionCreators_1;
    var reducer, store;
    function start(baseUrl) {
        if (!baseUrl.endsWith("/")) {
            baseUrl += "/";
        }
        // Replace fetch with a baseUrl-aware one
        let oldFetch = window.fetch;
        window.fetch = function (url, init) {
            let newUrl = url;
            if (typeof url === "string") {
                if (url.startsWith("~/")) {
                    newUrl = baseUrl + url.substring(2);
                }
            }
            return oldFetch(newUrl, init);
        };
        ReactDOM.render(React.createElement(react_redux_1.Provider, {store: store}, React.createElement(root_1.ILspectApp, null)), document.getElementById('app-root'));
    }
    exports_1("start", start);
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (electron_1) {
                electron = electron_1;
            },
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (react_redux_1_1) {
                react_redux_1 = react_redux_1_1;
            },
            function (Thunk_1) {
                Thunk = Thunk_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (actionCreators_1_1) {
                actionCreators_1 = actionCreators_1_1;
            }],
        execute: function() {
            reducer = new app_1.ApplicationReducer();
            store = redux_1.createStore(reducer.reduce.bind(reducer), redux_1.applyMiddleware(Thunk.default));
            electron.ipcRenderer.on('add-assembly', function (event, paths) {
                store.dispatch(actionCreators_1.addAssemblies(paths));
            });
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFjSSxPQUFPLEVBRVAsS0FBSztJQVNULGVBQXNCLE9BQWU7UUFDakMsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixPQUFPLElBQUksR0FBRyxDQUFDO1FBQ25CLENBQUM7UUFFRCx5Q0FBeUM7UUFDekMsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM1QixNQUFNLENBQUMsS0FBSyxHQUFHLFVBQVMsR0FBcUIsRUFBRSxJQUFrQjtZQUM3RCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDakIsRUFBRSxDQUFBLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDekIsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLE1BQU0sR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDdkMsQ0FBQztZQUNMLENBQUM7WUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUE7UUFFRCxRQUFRLENBQUMsTUFBTSxDQUNYLG9CQUFDLHNCQUFRLEdBQUMsS0FBSyxFQUFFLEtBQU0sR0FDbkIsb0JBQUMsaUJBQVUsT0FBRyxDQUNQLEVBQ1gsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUF4QkQseUJBd0JDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFuQ0csT0FBTyxHQUFHLElBQUksd0JBQWtCLEVBQUUsQ0FBQztZQUVuQyxLQUFLLEdBQUcsbUJBQVcsQ0FDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQzVCLHVCQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUNqQyxDQUFDO1lBRUYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQVMsS0FBSyxFQUFFLEtBQWU7Z0JBQ25FLEtBQUssQ0FBQyxRQUFRLENBQUMsOEJBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0ICogYXMgZWxlY3Ryb24gZnJvbSAnZWxlY3Ryb24nO1xuXG5pbXBvcnQge2NyZWF0ZVN0b3JlLGFwcGx5TWlkZGxld2FyZX0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0ICogYXMgVGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuXG5pbXBvcnQgKiBhcyBSZWR1Y3RzIGZyb20gJy4vcmVkdWN0cyc7XG5cbmltcG9ydCB7QXBwbGljYXRpb25SZWR1Y2VyfSBmcm9tICcuL3JlZHVjZXJzL2FwcCc7XG5pbXBvcnQge0lMc3BlY3RBcHB9IGZyb20gJy4vY29tcG9uZW50cy9yb290JztcbmltcG9ydCB7YWRkQXNzZW1ibGllc30gZnJvbSAnLi9hY3Rpb25DcmVhdG9ycyc7XG5cbmxldCByZWR1Y2VyID0gbmV3IEFwcGxpY2F0aW9uUmVkdWNlcigpO1xuXG5sZXQgc3RvcmUgPSBjcmVhdGVTdG9yZShcbiAgICByZWR1Y2VyLnJlZHVjZS5iaW5kKHJlZHVjZXIpLFxuICAgIGFwcGx5TWlkZGxld2FyZShUaHVuay5kZWZhdWx0KVxuKTtcblxuZWxlY3Ryb24uaXBjUmVuZGVyZXIub24oJ2FkZC1hc3NlbWJseScsIGZ1bmN0aW9uKGV2ZW50LCBwYXRoczogc3RyaW5nW10pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhZGRBc3NlbWJsaWVzKHBhdGhzKSk7XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KGJhc2VVcmw6IHN0cmluZykge1xuICAgIGlmKCFiYXNlVXJsLmVuZHNXaXRoKFwiL1wiKSkge1xuICAgICAgICBiYXNlVXJsICs9IFwiL1wiO1xuICAgIH1cbiAgICBcbiAgICAvLyBSZXBsYWNlIGZldGNoIHdpdGggYSBiYXNlVXJsLWF3YXJlIG9uZVxuICAgIGxldCBvbGRGZXRjaCA9IHdpbmRvdy5mZXRjaDtcbiAgICB3aW5kb3cuZmV0Y2ggPSBmdW5jdGlvbih1cmw6IHN0cmluZyB8IFJlcXVlc3QsIGluaXQ/OiBSZXF1ZXN0SW5pdCkge1xuICAgICAgICBsZXQgbmV3VXJsID0gdXJsO1xuICAgICAgICBpZih0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBpZih1cmwuc3RhcnRzV2l0aChcIn4vXCIpKSB7XG4gICAgICAgICAgICAgICAgbmV3VXJsID0gYmFzZVVybCArIHVybC5zdWJzdHJpbmcoMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG9sZEZldGNoKG5ld1VybCwgaW5pdCk7XG4gICAgfVxuICAgIFxuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgICA8SUxzcGVjdEFwcCAvPlxuICAgICAgICA8L1Byb3ZpZGVyPixcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcC1yb290JylcbiAgICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
