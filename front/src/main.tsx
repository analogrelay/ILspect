import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {connect,Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {IActionBase,ActionType} from './ilspect.tredux';
import * as App from './states/all';

import {ILspectApp} from './components/root';

let reducer = combineReducers({
    backend_connection: App.backend_connection
});
let store = createStore(
    reducer,
    applyMiddleware(thunk));

export function start(baseUrl: string) {
    ReactDOM.render(
        <Provider store={store}>
            <ILspectApp />
        </Provider>,
        document.getElementById('app-root')
    );
    
    store.dispatch(App.connectToBackend());
}
