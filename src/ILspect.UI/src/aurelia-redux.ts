import {AppState} from './state/app';
import {Store} from './main';

export interface ReduxContext {
    selector?: (state: AppState) => any,
    noAutoBind?: boolean
}

export function redux(): (c: Function) => any;
export function redux(context: ReduxContext): (c: Function) => any;
export function redux(context?: ReduxContext): (c: Function) => any {
    context = context || {};
    context.noAutoBind = context.noAutoBind || false;

    return (constructor: Function): any => {
        let newCtor: any = function(store: Store, ...rest: any[]) {
            let val = constructor.call(this, rest);
            val.__redux_store__ = store.reduxStore;
            val.__redux_context__ = context;
            return val;
        }
        newCtor.prototype = constructor.prototype;

        let existingInject: any[] = newCtor.inject || [];

        newCtor.inject = [Store, ...existingInject]
        return newCtor;
    };
}

export function fromState(target: any, propertyKey: string) {
}