import "./styles.scss";

import { HubConnection, MessagePackHubProtocol, TransportType } from "@aspnet/signalr-client";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Application } from "./components/application";
import { getParameterByName } from "./utils";

import { ipcRenderer } from "electron";

import { createStore } from "redux";

import { Provider } from "react-redux";
import { AddAssembliesAction } from "./actions";
import reducer from "./reducers";

const store = createStore(reducer);

ipcRenderer.on("assembly.add", (event: Event, paths: string[]) => {
    store.dispatch(new AddAssembliesAction(paths));
});

async function run() {
    ReactDOM.render(
        <Provider store={store}>
            <Application />
        </Provider>,
        document.getElementById("root"));
}

run();
