import './styles.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HubConnection, MessagePackHubProtocol, TransportType } from '@aspnet/signalr-client';

import { getParameterByName } from "./utils"
import { Application } from './components/Application';

async function run() {
    ReactDOM.render(
        <Application />,
        document.getElementById('root'));
}

run();