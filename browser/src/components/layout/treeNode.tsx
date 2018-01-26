import * as React from "react";
import { Icon } from "./icon";
import { Tree } from "./tree";
import { TreeNodeList } from "./treeNodeList";

export interface ITreeNodeProps {
    icon?: string;
    content?: any;
    tree?: Tree;
    onSelect?: () => void;
    onDeselect?: () => void;
}

export interface ITreeNodeState {
    expanded: boolean;
    selected: boolean;
}

export class TreeNode extends React.Component<ITreeNodeProps, ITreeNodeState> {
    public static is(e: React.ReactChild): e is React.ReactElement<ITreeNodeProps> {
        return React.isValidElement(e) && e.type === TreeNode;
    }

    constructor(props: ITreeNodeProps) {
        super(props);
        this.state = { expanded: false, selected: false };
    }

    public toggle() {
        this.setState({ expanded: !this.state.expanded });
    }

    public select() {
        this.props.tree.select(this);
    }

    public onDeselect() {
        this.setState({ selected: false });
        if (this.props.onDeselect) {
            this.props.onDeselect();
        }
    }

    public onSelect() {
        this.setState({ selected: true });
        if (this.props.onSelect) {
            this.props.onSelect();
        }
    }

    public render() {
        let icon;
        if (this.props.icon) {
            icon = <Icon name={this.props.icon} />;
        }

        let expander;
        if (this.props.children) {
            expander = <a href="#" className="tree-expander" onClick={() => this.toggle()}>
                {this.state.expanded ? <Icon name="minus-square" /> : <Icon name="plus-square" />}
            </a>;
        }

        let className = "tree-selector";
        if (this.state.selected) {
            className += " tree-node-selected";
        }

        return <li className="tree-node" onDoubleClick={() => this.toggle()}>
            {expander}
            <a className={className} href="#" onClick={() => this.select()}>
                {icon}
                {this.props.content}
            </a>
            <TreeNodeList expanded={this.state.expanded} tree={this.props.tree}>
                {this.props.children}
            </TreeNodeList>
        </li>;
    }
}
