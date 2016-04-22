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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFjSSxPQUFPLEVBRVAsS0FBSztJQVNULGVBQXNCLE9BQWU7UUFDakMsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixPQUFPLElBQUksR0FBRyxDQUFDO1FBQ25CLENBQUM7UUFFRCx5Q0FBeUM7UUFDekMsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM1QixNQUFNLENBQUMsS0FBSyxHQUFHLFVBQVMsR0FBcUIsRUFBRSxJQUFrQjtZQUM3RCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDakIsRUFBRSxDQUFBLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDekIsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLE1BQU0sR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDdkMsQ0FBQztZQUNMLENBQUM7WUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUE7UUFFRCxRQUFRLENBQUMsTUFBTSxDQUNYLG9CQUFDLHNCQUFRLEdBQUMsS0FBSyxFQUFFLEtBQU0sR0FDbkIsb0JBQUMsaUJBQVUsT0FBRyxDQUNQLEVBQ1gsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUF4QkQseUJBd0JDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFuQ0csT0FBTyxHQUFHLElBQUksd0JBQWtCLEVBQUUsQ0FBQztZQUVuQyxLQUFLLEdBQUcsbUJBQVcsQ0FDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQzVCLHVCQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUNqQyxDQUFDO1lBRUYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQVMsS0FBSyxFQUFFLEtBQWU7Z0JBQ25FLEtBQUssQ0FBQyxRQUFRLENBQUMsOEJBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCAqIGFzIGVsZWN0cm9uIGZyb20gJ2VsZWN0cm9uJztcclxuXHJcbmltcG9ydCB7Y3JlYXRlU3RvcmUsYXBwbHlNaWRkbGV3YXJlfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0ICogYXMgVGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xyXG5cclxuaW1wb3J0ICogYXMgUmVkdWN0cyBmcm9tICcuL3JlZHVjdHMnO1xyXG5cclxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZHVjZXJ9IGZyb20gJy4vcmVkdWNlcnMvYXBwJztcclxuaW1wb3J0IHtJTHNwZWN0QXBwfSBmcm9tICcuL2NvbXBvbmVudHMvcm9vdCc7XHJcbmltcG9ydCB7YWRkQXNzZW1ibGllc30gZnJvbSAnLi9hY3Rpb25DcmVhdG9ycyc7XHJcblxyXG5sZXQgcmVkdWNlciA9IG5ldyBBcHBsaWNhdGlvblJlZHVjZXIoKTtcclxuXHJcbmxldCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxyXG4gICAgcmVkdWNlci5yZWR1Y2UuYmluZChyZWR1Y2VyKSxcclxuICAgIGFwcGx5TWlkZGxld2FyZShUaHVuay5kZWZhdWx0KVxyXG4pO1xyXG5cclxuZWxlY3Ryb24uaXBjUmVuZGVyZXIub24oJ2FkZC1hc3NlbWJseScsIGZ1bmN0aW9uKGV2ZW50LCBwYXRoczogc3RyaW5nW10pIHtcclxuICAgIHN0b3JlLmRpc3BhdGNoKGFkZEFzc2VtYmxpZXMocGF0aHMpKTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RhcnQoYmFzZVVybDogc3RyaW5nKSB7XHJcbiAgICBpZighYmFzZVVybC5lbmRzV2l0aChcIi9cIikpIHtcclxuICAgICAgICBiYXNlVXJsICs9IFwiL1wiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBSZXBsYWNlIGZldGNoIHdpdGggYSBiYXNlVXJsLWF3YXJlIG9uZVxyXG4gICAgbGV0IG9sZEZldGNoID0gd2luZG93LmZldGNoO1xyXG4gICAgd2luZG93LmZldGNoID0gZnVuY3Rpb24odXJsOiBzdHJpbmcgfCBSZXF1ZXN0LCBpbml0PzogUmVxdWVzdEluaXQpIHtcclxuICAgICAgICBsZXQgbmV3VXJsID0gdXJsO1xyXG4gICAgICAgIGlmKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgaWYodXJsLnN0YXJ0c1dpdGgoXCJ+L1wiKSkge1xyXG4gICAgICAgICAgICAgICAgbmV3VXJsID0gYmFzZVVybCArIHVybC5zdWJzdHJpbmcoMilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gb2xkRmV0Y2gobmV3VXJsLCBpbml0KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgICAgICAgICA8SUxzcGVjdEFwcCAvPlxyXG4gICAgICAgIDwvUHJvdmlkZXI+LFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAtcm9vdCcpXHJcbiAgICApO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
