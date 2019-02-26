import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";

const appRoot = document.querySelector("#app-root");
ReactDOM.render(React.createElement(App), appRoot);