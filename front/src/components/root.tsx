import * as React from 'react';
import {connect} from '../ilspect.tredux';
import {ILspectState} from '../states/all';

export class ILspectApp extends React.Component<any, any> {
    render() {
        return <ILspectRoot />;
    }
}

@connect(
    (state) => ({connected: state.backend_connection.connected})
)
class ILspectRoot extends React.Component<any, any> {
    render() {
        return <div>
            {this.props.connected ? "Connected" : "Connecting..."}
        </div>;
    }
}