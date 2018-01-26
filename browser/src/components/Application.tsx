import * as React from "react";
import { connect } from "react-redux";
import { AssemblyNavigator } from "./assemblyNavigator";

export class Application extends React.Component {
    public render() {
        return <div className="row">
            <div id="split-leftPane" className="col" style={{maxWidth: 200}}>
                <AssemblyNavigator />
            </div>
            <div id="split-rightPane" className="col" style={{left: 200}}>
                Right
            </div>
        </div>;
    }
}
