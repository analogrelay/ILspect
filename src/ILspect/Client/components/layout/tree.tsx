import * as React from 'react';
import * as Reducts from '../../reducts';

import {Icon} from '../widgets';

const treeClass = "l-tree";
const treeNodeClass = "l-treeNode";

export class Tree extends React.Component<ITreeProps, any> {
    render() {
        var className = treeClass;
        if (this.props.className) {
            className += " " + this.props.className;
        }
        var style = Object.assign({}, this.props.style, {
            display: this.props.expanded ? "block" : "none"
        });
        var props = Object.assign({}, this.props, { className: className, style: style });

        return <ul {... props}>
            {this.props.children}
        </ul>
    }
}

export class TreeNode extends React.Component<ITreeNodeProps, ITreeNodeState> {
    static is(child: React.ReactElement<any>): child is React.ReactElement<ITreeNodeProps> {
        return child.type == TreeNode;
    }
    
    constructor() {
        super();
        this.state = {expanded: false};
    }
    
    onClick(event: Event) {
        this.setState({ expanded: !this.state.expanded });
    }
    
    render() {
        var className = treeNodeClass;
        if (this.props.className) {
            className += " " + this.props.className;
        }
        var props = Object.assign({}, this.props, { className: className });

        var icon;
        if (this.props.icon) {
            icon = <Icon name={this.props.icon} />;
        }

        var expander;
        var children;
        if (React.Children.count(this.props.children) > 0) {
            expander = <Icon name={this.state.expanded ? "menu-down" : "menu-right"} />;
            children = <Tree expanded={this.state.expanded}>{this.props.children}</Tree>;
        }

        return <li {... props}>
            <a href="#" onClick={this.onClick.bind(this)}>
                {expander}
                {icon}
                <span className="l-treeNode-text">
                    {this.props.text}
                </span>
            </a>
            {children}
        </li>
    }
}

interface ITreeNodeProps extends React.HTMLAttributes {
    text: string
    icon?: string
}

interface ITreeNodeState {
    expanded: boolean
}

interface ITreeProps extends React.HTMLAttributes {
    expanded?: boolean
}