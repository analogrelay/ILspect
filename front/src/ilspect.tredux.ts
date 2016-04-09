import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as Tredux from './tredux';
import {ILspectState} from './states/all';

export enum ActionType {
    Connecting,
    Connected
}

export type Reducer = Tredux.Reducer<ILspectState, ActionType>;
export type IActionBase = Tredux.IActionBase<ActionType>;
export type IAction<T> = Tredux.IAction<T, ActionType>;
export type IErrorAction<T> = Tredux.IErrorAction<T, ActionType>;

export interface BackendConnectionState {
    baseUrl: string
    connected: boolean
}

export function connect(): ReactRedux.InferableComponentDecorator;
export function connect<TStateProps>(
mapStateToProps?: MapStateToProps<TStateProps, any>
): ReactRedux.ComponentDecorator<TStateProps, any>;
export function connect<TStateProps, TDispatchProps>(
mapStateToProps?: MapStateToProps<TStateProps, any>,
mapDispatchToProps?: MapDispatchToPropsFunction<TDispatchProps, any>|MapDispatchToPropsObject
): ReactRedux.ComponentDecorator<TStateProps & TDispatchProps, any>;
export function connect<TStateProps, TDispatchProps, TOwnProps>(
mapStateToProps?: MapStateToProps<TStateProps, TOwnProps>,
mapDispatchToProps?: MapDispatchToPropsFunction<TDispatchProps, TOwnProps>|MapDispatchToPropsObject
): ReactRedux.ComponentDecorator<TStateProps & TDispatchProps, TOwnProps>;
export function connect<TStateProps, TDispatchProps, TOwnProps>(
mapStateToProps?: MapStateToProps<TStateProps, TOwnProps>,
mapDispatchToProps?: MapDispatchToPropsFunction<TDispatchProps, TOwnProps>|MapDispatchToPropsObject,
mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps>,
options?: ReactRedux.Options
): ReactRedux.ComponentDecorator<TStateProps & TDispatchProps, TOwnProps> {
    return ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps, options);
}

interface MapStateToProps<TStateProps, TOwnProps> {
    (state: ILspectState, ownProps?: TOwnProps): TStateProps;
}

interface MapDispatchToPropsFunction<TDispatchProps, TOwnProps> {
    (dispatch: Redux.Dispatch, ownProps?: TOwnProps): TDispatchProps;
}

interface MapDispatchToPropsObject {
    [name: string]: Redux.ActionCreator;
}

interface MergeProps<TStateProps, TDispatchProps, TOwnProps> {
    (stateProps: TStateProps, dispatchProps: TDispatchProps, ownProps: TOwnProps): TStateProps & TDispatchProps;
}