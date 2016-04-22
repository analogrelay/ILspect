import * as React from 'react';
import * as State from '../state';
import {connect} from '../reducts';

import {NamespaceList} from './namespaceList';

import {Icon} from './widgets';
import {Tree,TreeNode} from './layout/tree';

@connect<State.Application, IAssemblyListProps>(
    (state) => ({ assemblies: state.assemblyList.assemblies.toArray() })
)
export class AssemblyList extends React.Component<IAssemblyListProps, any> {
    render() {
        return <Tree className="c-assemblyList">
            {this.props.assemblies.map((assembly) => {
                return <AssemblyListEntry key={assembly.path} assembly={assembly} />  
            })}
        </Tree>
    }    
}

export class AssemblyListEntry extends React.Component<IAssemblyListEntryProps, any> {
    render() {
        var className = 'c-assemblyListEntry';
        if (this.props.assembly.status == State.AssemblyStatus.Loading) {
            className += ' c-assemblyListEntry-loading';
        }
        
        var nsList;
        if(this.props.assembly.namespaces) {
            nsList = <NamespaceList namespaces={this.props.assembly.namespaces} />;
        }
        
        return <TreeNode className={className} icon="book">
            <span className="c-assemblyListEntry-text">
                {this.props.assembly.name || "Loading ..."}
            </span>
        </TreeNode>;
    }
}

interface IAssemblyListEntryProps {
    assembly?: State.Assembly
}

interface IAssemblyListProps {
    assemblies?: State.Assembly[]
}