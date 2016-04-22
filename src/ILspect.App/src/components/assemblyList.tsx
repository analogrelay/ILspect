import * as React from 'react';
import * as State from '../state';
import {connect} from '../reducts';

import {Icon} from './widgets';
import {Tree,TreeNode} from './layout/tree';

@connect<State.Application, IAssemblyListProps>(
    (state) => ({ assemblies: state.assemblyList.assemblies.toArray() })
)
export class AssemblyList extends React.Component<IAssemblyListProps, any> {
    render() {
        return <ul className="l-tree c-assemblyList">
            {this.props.assemblies.map((assembly) => {
                return <AssemblyListEntry key={assembly.path} assembly={assembly} />  
            })}
        </ul>
    }    
}

export class AssemblyListEntry extends React.Component<IAssemblyListEntryProps, IAssemblyListEntryState> {

    constructor() {
        super();
        this.state = { expanded: false };
    }

    onClick(event: Event) {
        this.setState({ expanded: !this.state.expanded });
    }
    
    render() {
        var className = 'l-treeNode c-assemblyListEntry';
        if (this.props.assembly.status == State.AssemblyStatus.Loading) {
            className += ' c-assemblyListEntry-loading';
        }
        
        function renderMember(m: State.Member) {
            var children;
            if(State.memberIsType(m)) {
                children = m.members.map(renderMember)
            }
            
            var icon;
            
            switch(m.kind) {
                case State.MemberKind.Event:
                    icon = "asterisk";
                    break;
                case State.MemberKind.Field:
                    icon = "tag";
                    break;
                case State.MemberKind.Method:
                    icon = "fire";
                    break;
                case State.MemberKind.Property:
                    icon = "info-sign";
                    break;
                case State.MemberKind.Type:
                    icon = "list";
                    break;
            }
            
            return <TreeNode key={m.name} className={className} icon={icon} text={m.name}>
                {children}
            </TreeNode>;
        }
        
        return <li className={className}>
            <a href="#" onClick={this.onClick.bind(this)}>
                <Icon name="book" />
                <span class="l-treeNode-text">
                    {this.props.assembly.name || "Loading..."}
                </span>
            </a>
            <Tree expanded={this.state.expanded}>
                {this.props.assembly.namespaces ? this.props.assembly.namespaces.map((ns) =>
                    <TreeNode key={ns.name} className={className} icon="gift" text={ns.name || "<Default>" }>
                        {ns.types ? ns.types.map(renderMember) : ""}
                    </TreeNode> 
                ) : ""}
            </Tree>
        </li>;
    }
}

interface IAssemblyListEntryProps {
    assembly?: State.Assembly
}

interface IAssemblyListEntryState {
    expanded: boolean
}

interface IAssemblyListProps {
    assemblies?: State.Assembly[]
}