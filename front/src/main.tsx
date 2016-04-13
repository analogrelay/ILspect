import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as Thunk from 'redux-thunk';

import * as Reducts from './reducts';

import {ApplicationState,ApplicationReducer} from './modules/app';
import {ConnectionReducer} from './modules/connection';
import {ILspectApp} from './components/root';

let reducer = new ApplicationReducer();

export function start(baseUrl: string) {
    let store = createStore(
        reducer.reduce.bind(reducer),
        applyMiddleware(Thunk.default)
    );
    
    ReactDOM.render(
        <Provider store={store}>
            <ILspectApp />
        </Provider>,
        document.getElementById('app-root')
    );
    
    store.dispatch(ConnectionReducer.connectToBackend(baseUrl));
}
