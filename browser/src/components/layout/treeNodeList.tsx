import * as React from "react";
import { Tree } from "./tree";
import { ITreeNodeProps, TreeNode } from "./treeNode";

interface ITreeNodeListProps {
    expanded: boolean;
    tree: Tree;
}

export class TreeNodeList extends React.Component<ITreeNodeListProps> {
    public render() {
        const className = "tree-view";
        let children;
        if (this.props.expanded) {
            children = React.Children.map(this.props.children, (child) => {
                if (TreeNode.is(child)) {
                    return React.cloneElement(child, {
                        tree: this.props.tree,
                    } as ITreeNodeProps);
                } else {
                    throw new Error(`Invalid child of Tree element: ${child}`);
                }
            });
        }
        return <ul className={className}>
            {children}
        </ul>;
    }
}
