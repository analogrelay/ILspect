import {createStore, applyMiddleware, IStore} from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import {Aurelia} from 'aurelia-framework';

import {AppState} from './state/app';
import {reducer} from './reducers/app';

const logger = createLogger();

// Set up Redux store
export class Store {
    reduxStore = createStore<any>(
        reducer,
        applyMiddleware(
            ReduxThunk,
            logger)) as IStore<AppState>;
}

const store = new Store();

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    aurelia.container.registerInstance(Store, store);

    aurelia.start().then(a => a.setRoot('views/app'));
}