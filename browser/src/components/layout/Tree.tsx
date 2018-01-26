import * as React from 'react';

import { Icon } from "./icon";

export class Tree extends React.Component {
    private selected: TreeNode;

    render() {
        return <TreeNodeList expanded={true} tree={this}>
            {this.props.children}
        </TreeNodeList>;
    }

    select(node: TreeNode) {
        if (this.selected) {
            this.selected.onDeselect();
        }
        this.selected = node;
        this.selected.onSelect();
    }
}

interface TreeNodeListProps {
    expanded: boolean,
    tree: Tree,
}

class TreeNodeList extends React.Component<TreeNodeListProps> {
    render() {
        let className = 'tree-view';
        let children;
        if (this.props.expanded) {
            children = React.Children.map(this.props.children, child => {
                if (TreeNode.is(child)) {
                    return React.cloneElement(child, {
                        tree: this.props.tree
                    } as TreeNodeProps);
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

export interface TreeNodeProps {
    icon?: string;
    content?: any;
    tree?: Tree;
    onSelect?: () => void;
    onDeselect?: () => void;
}

export interface TreeNodeState {
    expanded: boolean;
    selected: boolean;
}

export class TreeNode extends React.Component<TreeNodeProps, TreeNodeState> {
    static is(e: React.ReactChild): e is React.ReactElement<TreeNodeProps> {
        return React.isValidElement(e) && e.type == TreeNode;
    }

    constructor(props: TreeNodeProps) {
        super(props);
        this.state = { expanded: false, selected: false };
    }

    toggle() {
        this.setState({ expanded: !this.state.expanded });
    }

    select() {
        this.props.tree.select(this);
    }

    onDeselect() {
        this.setState({ selected: false });
        if(this.props.onDeselect) {
            this.props.onDeselect();
        }
    }

    onSelect() {
        this.setState({ selected: true });
        if(this.props.onSelect) {
            this.props.onSelect();
        }
    }

    render() {
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