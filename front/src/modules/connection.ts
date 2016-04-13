import * as Redux from 'redux';

import * as Reducts from '../reducts';
import {mut} from '../utils'

// Connection State and Actions
export interface ConnectionState {
    connected?: boolean;
    baseUrl?: string;
}

let ConnectingAction = new Reducts.EmptyActionType("CONNECTION_CONNECTING");
let ConnectedAction = new Reducts.ActionType<string>("CONNECTION_CONNECTED");

let initialState: ConnectionState = {
    connected: false,
    baseUrl: ''
};

export class ConnectionReducer extends Reducts.Reducer<ConnectionState, any> {
    reduce(state: ConnectionState = initialState, action: Reducts.IAction<any> | Reducts.IAction<string>): ConnectionState {
        if(ConnectingAction.is(action)) {
            return mut(state, { connected: false });
        } else if(ConnectedAction.is(action)) {
            return mut(state, { connected: true, baseUrl: action.payload });
        }
        return state;
    }
    
    static connectToBackend(baseUrl: string): (dispatch) => Promise<any> {
        return async (dispatch: Redux.Dispatch) => {
            dispatch(ConnectingAction.create());
            setTimeout(function() {
                dispatch(ConnectedAction.create(baseUrl));
            }, 3000);  
        };
    }
}