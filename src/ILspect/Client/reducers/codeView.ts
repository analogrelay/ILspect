import * as Immutable from 'immutable';

import {Reducer,IAction} from '../reducts';

import * as State from '../state';
import * as Actions from '../actionTypes'
import {mut} from '../utils';

let initialState: State.CodeView = {
    content: ""
};

export class CodeViewReducer extends Reducer<State.CodeView, any> {
    reduce(state: State.CodeView = initialState, action: IAction<any>): State.CodeView {
        if (Actions.DecompiledObject.is(action)) {
            return mut(state, { content: action.payload });
        }
        else {
            return state;
        }
    }
}