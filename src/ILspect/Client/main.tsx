import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as electron from 'electron';

import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as Thunk from 'redux-thunk';

import * as Reducts from './reducts';

import {ApplicationReducer} from './reducers/app';
import {ILspectApp} from './components/root';
import {addAssemblies} from './actionCreators';

let reducer = new ApplicationReducer();

let store = createStore(
    reducer.reduce.bind(reducer),
    applyMiddleware(Thunk.default)
);

electron.ipcRenderer.on('add-assembly', function(event, paths: string[]) {
    store.dispatch(addAssemblies(paths));
});

export function start(baseUrl: string) {
    if(!baseUrl.endsWith("/")) {
        baseUrl += "/";
    }

    // Replace fetch with a baseUrl-aware one
    let oldFetch = window.fetch;
    window.fetch = function(url: string | Request, init?: RequestInit) {
        let newUrl = url;
        if(typeof url === "string") {
            if(url.startsWith("~/")) {
                newUrl = baseUrl + url.substring(2)
            }
        }

        return oldFetch(newUrl, init);
    }

    ReactDOM.render(
        <Provider store={store}>
            <ILspectApp />
        </Provider>,
        document.getElementById('app-root')
    );
}
