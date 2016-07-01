import {createStore, applyMiddleware, IStore, IDispatch, IReducer} from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import {Aurelia} from 'aurelia-framework';

import {AppState} from './state/app';
import {reducer} from './reducers/app';

const logger = createLogger();

// Simple wrapper to simplify injection
export class Store implements IStore<AppState> {
    private _store = createStore<any>(
        reducer,
        applyMiddleware(
            ReduxThunk,
            logger)) as IStore<AppState>;

    subscribe(listener: (state: AppState) => any) {
        return this._store.subscribe(listener);
    }

    replaceReducer(nextReducer: IReducer<AppState>) {
        this._store.replaceReducer(nextReducer);
    }

    getState() {
        return this._store.getState();
    }
    
	get dispatch() { return this._store.dispatch; }
}

const store = new Store();

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    aurelia.container.registerInstance(Store, store);

    aurelia.start().then(a => a.setRoot('views/app'));
}