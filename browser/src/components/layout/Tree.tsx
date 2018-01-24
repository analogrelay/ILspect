import * as React from 'react';

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
        return <li className="tree-node">
            <a className="tree-selector" href="#" onClick={() => this.toggle()}>{this.props.content}</a>
            <TreeNodeList expanded={this.state.expanded}>
                {this.props.children}
            </TreeNodeList>
        </li>;
    }
}