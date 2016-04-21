import * as React from 'react';
import * as State from '../state';
import {connect} from '../reducts';

import {Icon} from './widgets'

@connect<State.Application, IAssemblyListProps>(
    (state) => ({ assemblies: state.assemblyList.assemblies.toArray() })
)
export class AssemblyList extends React.Component<IAssemblyListProps, any> {
    render() {
        return <ul className="c-assemblyList">
            {this.props.assemblies.map((assembly) => {
                return <AssemblyListEntry key={assembly.path} assembly={assembly} />  
            })}
        </ul>
    }    
}

export class AssemblyListEntry extends React.Component<IAssemblyListEntryProps, any> {
    render() {
        var className = 'c-assemblyListEntry';
        if (this.props.assembly.status == State.AssemblyStatus.Loading) {
            className += ' c-assemblyListEntry-loading';
        }
        
        return <li className={className}>
            <Icon name="menu-right" />
            <Icon name="book" />
            <span className="c-assemblyListEntry-text">
                {this.props.assembly.name || "Loading ..."}
            </span>
        </li>;
    }
}

interface IAssemblyListEntryProps {
    assembly?: State.Assembly
}

interface IAssemblyListProps {
    assemblies?: State.Assembly[]
}