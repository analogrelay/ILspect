import './styles.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HubConnection, MessagePackHubProtocol, TransportType } from '@aspnet/signalr-client';

function getParameterByName(name: string, url: string) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

async function run() {
    let serverUrl = getParameterByName("serverUrl", document.location.search);
    let connection = new HubConnection(`${serverUrl}/disassembler`, {
        transport: TransportType.WebSockets,
        protocol: new MessagePackHubProtocol()
    });

    await connection.start();

    let value = await connection.invoke("Echo", "Test");

    ReactDOM.render(
        <div>
            <h1>Hello, world!</h1>
            <p>Server says: {value}</p>
        </div>,
        document.getElementById('root'));
}

run();