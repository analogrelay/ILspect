import * as React from 'react';
import * as Reducts from '../../reducts';

import {Icon} from '../widgets';

const treeClass = "l-tree";
const treeNodeClass = "l-treeNode";

export class Tree extends React.Component<ITreeProps, any> {
    render() {
        var props = Object.create(this.props.className);
        if (props.className) {
            props.className = treeClass + " " + props.className;
        } else {
            props.className = treeClass;
        }
        
        return <ul {...props}>
            {this.props.children}
        </ul>
    }
}

export class TreeNode extends React.Component<ITreeNodeProps, any> {
    render() {
        var props = Object.create(this.props.className);
        if (props.className) {
            props.className = treeNodeClass + " " + props.className;
        } else {
            props.className = treeNodeClass;
        }
        
        var icon;
        if(this.props.icon) {
            icon = <Icon name={this.props.icon} />;
        }
        
        var expander;
        var children;
        if(React.Children.count(this.props.children) > 0) {
            expander = <Icon name="menu-right" />;
        }
        
        return <li {...props}>
            {expander}
            {icon}
            {children}
        </li>
    }
}

interface ITreeNodeProps extends React.HTMLAttributes {
    icon?: string
}

interface ITreeProps extends React.HTMLAttributes {
}