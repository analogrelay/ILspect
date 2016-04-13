import * as Reducts from '../reducts';

import {ConnectionReducer,ConnectionState} from './connection'
export {ConnectionReducer,ConnectionState} from './connection'

export interface ApplicationState {
    connection: ConnectionState;
}

export class ApplicationReducer extends Reducts.MultiReducer<ApplicationState> {
    public connection = new ConnectionReducer();
}