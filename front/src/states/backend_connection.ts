import {ActionType,IActionBase} from '../ilspect.tredux';

type BackendActions = ConnectingAction | ConnectedAction;

export interface BackendConnectionState {
    connected: boolean
}

let initialState: BackendConnectionState = {
    connected: false
}

export function connectToBackend() {
    async function tryConnect(dispatch: Redux.Dispatch) {
        try {
            let resp = await fetch('http://localhost:20201/_status');
            dispatch(new ConnectedAction());
        } catch(e) {
            setTimeout(tryConnect, 500);
        }
    };
        
    return async (dispatch: Redux.Dispatch) => {
        // Indicate that we are connecting
        dispatch(new ConnectingAction());
      
        // Keep trying to connect until we succeed  
        tryConnect(dispatch);
    }
}

export function backend_connection(state: BackendConnectionState = initialState, action: BackendActions): BackendConnectionState {
    switch(action.type) {
        case ActionType.Connecting:
            return Object.assign({}, state, { connected: false });
        case ActionType.Connected:
            return Object.assign({}, state, { connected: true });
        default:
            return state;
    }
}

export class ConnectingAction implements IActionBase {
    type = ActionType.Connecting;
}

export class ConnectedAction implements IActionBase {
    type = ActionType.Connected;
}