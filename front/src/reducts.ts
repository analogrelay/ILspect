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

export abstract class Reducer<TState, TAction> implements IReducer<TState, TAction> {
    abstract reduce(state: TState, action: TAction): TState;
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