import './styles.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HubConnection, MessagePackHubProtocol, TransportType } from '@aspnet/signalr-client';

import { getParameterByName } from "./utils"
import { Application } from './components/application';

import { ipcRenderer } from 'electron';

import { createStore } from 'redux';

import reducer from './reducers';
import { INITIAL_STATE } from './state';
import { AddAssemblyAction } from './actions'

let store = createStore(reducer, INITIAL_STATE);

ipcRenderer.on("assembly.add", (event: Event, paths: string[]) => {
    store.dispatch(new AddAssemblyAction())
});

async function run() {
    ReactDOM.render(
        <Application />,
        document.getElementById('root'));
}

run();