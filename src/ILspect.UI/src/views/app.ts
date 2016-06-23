import {Store} from '../main';
import {AppState} from '../state/app';
import {autoinject} from 'aurelia-framework';

import {changeMessage} from '../actions/changeMessage';

@autoinject
export class App {
    message = "Hello, World";

    constructor(private store: Store) {
        this.store.subscribe(s => {
            let new_val = store.getState().message;
            if(this.message !== new_val) {
                this.message = new_val;
            }
        });
    }

    getNewMessage() {
        this.store.dispatch(changeMessage(this.message + ", again"));
    }
}