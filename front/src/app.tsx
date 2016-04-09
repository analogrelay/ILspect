import * as React from 'react';
import {HttpClient,HttpResponseType} from './http';

interface ILspectAppProps {
    baseUrl: string
}

interface ILspectAppState {
    connected: boolean
}

export class XildasmApp extends React.Component<ILspectAppProps, ILspectAppState> {
    private _http: HttpClient;
    
    constructor(props?: XildasmAppProps, context?: any) {
        super(props, context);
        this._http = new HttpClient(props.baseUrl);
        this.state = {
            connected: false
        };
    }
    
    componentDidMount() {
        // Try to connect, iterate until we do {
        this.connectToBackend();
    }
    
    async connectToBackend() {
        try {
            let resp = await this._http.get("_status");
            this.setState({ connected: true });
        } catch(m) {
            console.log(`failed to connect (${m}), retrying...`);
            setTimeout(() => this.connectToBackend(), 500);
        }
    }
    
    render() {
        var content;
        if (!this.state.connected) {
            content = "Loading...";
        } else {
            content = "Connected!";
        }
        return <div>
            {content}
        </div>;
    }
}