import * as React from 'react';

import { Icon } from "./Icon";

export class Tree extends React.Component {
    render() {
        return <TreeNodeList expanded={true}>
            {this.props.children}
        </TreeNodeList>;
    }
}

interface TreeNodeListProps {
    expanded: boolean
}

class TreeNodeList extends React.Component<TreeNodeListProps> {
    render() {
        let className = 'tree-view';
        return <ul className={className}>
            {this.props.expanded ? this.props.children : null}
        </ul>;
    }
}

export interface TreeNodeProps {
    icon?: string;
    content?: any;
}

export interface TreeNodeState {
    expanded: boolean;
}

export class TreeNode extends React.Component<TreeNodeProps, TreeNodeState> {
    constructor(props: TreeNodeProps) {
        super(props);
        this.state = { expanded: false };
    }

    toggle() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        let icon;
        if (this.props.icon) {
            icon = <Icon name={this.props.icon} />;
        }

        let expander;
        if(this.props.children) {
            expander = <a href="#" className="tree-expander" onClick={() => this.toggle()}>
                {this.state.expanded ? <Icon name="minus-square" /> : <Icon name="plus-square" />}
            </a>;
        }

        return <li className="tree-node">
            {expander}
            <a className="tree-selector" href="#">
                {icon}
                {this.props.content}
            </a>
            <TreeNodeList expanded={this.state.expanded}>
                {this.props.children}
            </TreeNodeList>
        </li>;
    }
}