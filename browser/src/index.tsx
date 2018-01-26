import "./styles.scss";

import { HubConnection, MessagePackHubProtocol, TransportType } from "@aspnet/signalr-client";
import { ipcRenderer } from "electron";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { addAssemblies } from "./actions";
import { Application } from "./components/application";
import reducer from "./reducers";
import { getParameterByName } from "./utils";

const store = createStore(reducer, applyMiddleware(thunk));

Next, create the disassembler and wire it up to things.

ipcRenderer.on("assembly.add", (event: Event, paths: string[]) => {
    store.dispatch(addAssemblies(paths));
});

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById("root"));
