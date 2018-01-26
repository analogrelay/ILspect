import * as React from "react";

import { Icon } from "./icon";
import { TreeNode } from "./treeNode";
import { TreeNodeList } from "./treeNodeList";

export class Tree extends React.Component {
    private selected: TreeNode;

    public render() {
        return <TreeNodeList expanded={true} tree={this}>
            {this.props.children}
        </TreeNodeList>;
    }

    public select(node: TreeNode) {
        if (this.selected) {
            this.selected.onDeselect();
        }
        this.selected = node;
        this.selected.onSelect();
    }
}
