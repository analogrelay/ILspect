import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../state";
import { Tree } from "./layout/tree";
import { TreeNode } from "./layout/treeNode";

interface IAssemblyNavigatorProps {
    assemblies: string[];
}

class AssemblyNavigatorImpl extends React.Component<IAssemblyNavigatorProps> {
    public render() {
        const nodes = this.props.assemblies.map((assembly) => {
            return <TreeNode content={assembly} />;
        });
        return <Tree>{nodes}</Tree>;
    }
}

export const AssemblyNavigator = connect(
    (state: IApplicationState): IAssemblyNavigatorProps => {
        return {
            assemblies: state.assemblies.map((a) => a.name),
        };
    },
)(AssemblyNavigatorImpl);
