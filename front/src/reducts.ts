import * as React from 'react';
import * as ReactRedux from 'react-redux';

interface IHasProps<T> {
    props: T
}

export function isComponent<T extends IHasProps<P>, P>(e: React.ReactElement<any>, ctor: () => T): e is React.ReactElement<P> {
    return (e.type as any) === ctor;
}

export function connect<TState, TProps>(mapStateToProps: (state: TState, ownProps?: any) => TProps) {
    return (component: React.ComponentClass<TProps> | React.StatelessComponent<TProps>) => {
        return ReactRedux.connect<any, any, any>(mapStateToProps)(component);
    }
}

export interface IAction<T> {
    type: string,
    payload: T,
    error: boolean
}

export class ActionType<T> {
    constructor(public name: string, public error: boolean = false) { }

    is(action: any): action is IAction<T> {
        return action.type === this.name;
    }
    
    create(payload: T): IAction<T> {
        return {
            type: this.name,
            payload: payload,
            error: this.error
        }
    }
}

export class EmptyActionType extends ActionType<{}> {
    create(): IAction<{}> {
        return super.create(undefined);
    }
}

export interface IReducerBase {
    reduce(state: any, action: any): any;
}

export interface IReducer<TState, TAction> extends IReducerBase {
    reduce(state: TState, action: TAction): TState;
}

export abstract class Reducer<TState, TPayload> implements IReducer<TState, IAction<TPayload>> {
    abstract reduce(state: TState, action: IAction<TPayload>): TState;
}

export class MultiReducer<TState> implements IReducer<TState, any> {
    reduce(state: TState, action: any): TState {
        let new_state = Object.assign({}, state);
        Object.keys(this).forEach((key) => {
            let oldState;
            if (state !== undefined) {
                oldState = state[key];
            }
            new_state[key] = this[key].reduce(oldState, action);
        });
        return new_state;
    }
}

export abstract class StateObject<TSelf> {
    mutate(new_values: TSelf): TSelf {
        return Object.assign({}, this, new_values);
    }
}