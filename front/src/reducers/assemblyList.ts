import * as Immutable from 'immutable';

import {Reducer,IAction} from '../reducts';

import * as State from '../state';
import * as Actions from '../actionTypes'
import {mut} from '../utils';

let initialState : State.AssemblyList = {
    assemblies: Immutable.List<State.Assembly>()
}

export class AssemblyListReducer extends Reducer<State.AssemblyList, any> {
    reduce(state: State.AssemblyList = initialState, action: IAction<any>): State.AssemblyList {
        if(Actions.AddingAssembly.is(action)) {
            return mut(state, { 
                assemblies: state.assemblies.withMutations((assemblies) => {
                    action.payload.forEach(path => {
                        let existing = state.assemblies.findIndex((v) => v.path === path);
                        if (existing == -1) {
                            assemblies.push({
                                name: null,
                                path: path,
                                status: State.AssemblyStatus.Loading
                            });
                        }
                    });
                })
             });
        }
        else if(Actions.ResolvedAssemblies.is(action)) {
            return mut(state, {
                assemblies: state.assemblies.withMutations((assemblies) => {
                    action.payload.forEach(a => {
                        let existing = assemblies.findIndex((v) => v.path === a.path);
                        if (existing >= 0) {
                            assemblies.set(existing, mut(a, { status: State.AssemblyStatus.Loaded }));
                        }
                    })  
                })
            });
        }
        else {
            return state;
        }
    }
}