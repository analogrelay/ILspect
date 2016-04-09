import {BackendConnectionState} from './backend_connection';
export {BackendConnectionState,backend_connection,connectToBackend} from './backend_connection';

export interface ILspectState {
    backend_connection: BackendConnectionState
}

export var initialState : ILspectState = {
    backend_connection: {
        connected: false
    }
};