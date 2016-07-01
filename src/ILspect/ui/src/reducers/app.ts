import {combineReducers, IAction, IActionGeneric} from 'redux';
import {AppState} from '../state/app';

import {CHANGE_MESSAGE} from '../actions/changeMessage';

export function reducer(state: AppState, action: IAction): AppState {
    if(action.type === CHANGE_MESSAGE) {
        return {
            message: state.message + (action as IActionGeneric<string>).payload
        };
    }
    return state;
}