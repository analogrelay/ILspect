export type Reducer<TState, TType> = (state: TState, action: IActionBase<TType>) => TState;

export interface IActionBase<TType> {
    type: TType
}

export interface IAction<T, TType> extends IActionBase<TType> {
    payload: T
}

export interface IErrorAction<T, TType> extends IAction<T, TType> {
    error: boolean
}