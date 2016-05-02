import * as React from 'react';
import * as Reducts from '../../reducts';

import {Icon} from '../widgets';

const treeClass = "l-tree";
const treeNodeClass = "l-treeNode";
const selectedTreeNodeClass = "l-treeNode-selected";
const deselectedTreeNodeClass = "l-treeNode-deselected";

export class Tree extends React.Component<any, any> {
    private selectedNode: TreeNode;

    select(node: TreeNode) {
        if (this.selectedNode) {
            this.selectedNode.onDeselect();
        }
        this.selectedNode = node;
        this.selectedNode.onSelect();
    }

    render() {
        return <TreeNodeList tree={this} expanded={true}>
            {this.props.children}
        </TreeNodeList>
    }
}

export class TreeNodeList extends React.Component<ITreeNodeListProps, any> {
    render() {
        var className = treeClass;
        if (this.props.className) {
            className += " " + this.props.className;
        }
        var style = Object.assign({}, this.props.style, {
            display: this.props.expanded ? "block" : "none"
        });
        var props = Object.assign({}, this.props, { className: className, style: style });

        var children = React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                if (TreeNode.is(child)) {
                    return React.cloneElement(child, {
                        owner: this.props.tree,
                        parent: this.props.parent
                    } as ITreeNodeProps);
                } else {
                    throw `Invalid child node of Tree: ${child.type}`;
                }
            }
            // Ignore non-element content
        });

        return <ul {...props}>
            {children}
        </ul>
    }
}

export class TreeNode extends React.Component<ITreeNodeProps, ITreeNodeState> {
    static is(child: React.ReactElement<any>): child is React.ReactElement<ITreeNodeProps> {
        return child.type == TreeNode;
    }

    constructor() {
        super();
        this.state = { expanded: false };
    }

    expand(event: Event) {
        this.setState({ expanded: !this.state.expanded });
    }

    select(event: Event) {
        this.props.owner.select(this);
    }

    onSelect() {
        this.setState({ selected: true });
        if (this.props.onSelect) {
            this.props.onSelect()
        }
    }

    onDeselect() {
        this.setState({ selected: false });
        if (this.props.onDeselect) {
            this.props.onDeselect()
        }
    }

    render() {
        var className = treeNodeClass;
        if (this.state.selected) {
            className += " " + selectedTreeNodeClass;
        } else {
            className += " " + deselectedTreeNodeClass;
        }

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
            children = <TreeNodeList tree={this.props.owner} expanded={this.state.expanded} parent={this}>{this.props.children}</TreeNodeList>;
        }

        return <li {...props}>
            <div className="l-treeNode-header" onDoubleClick={this.expand.bind(this) }>
                <a href="#" onClick={this.expand.bind(this) }>
                    {expander}
                    {icon}
                </a>
                <a href="#" onClick={this.select.bind(this) } className="l-treeNode-text">
                    {this.props.text}
                </a>
            </div>
            {children}
        </li>
    }
}

interface ITreeNodeProps extends React.HTMLAttributes {
    text?: string
    icon?: string
    onSelect?: () => void
    onDeselect?: () => void
    owner?: Tree
    parent?: TreeNode
}

interface ITreeNodeState {
    expanded?: boolean
    selected?: boolean
}

interface ITreeNodeListProps extends React.HTMLAttributes {
    tree: Tree
    expanded: boolean
    parent?: TreeNode
}