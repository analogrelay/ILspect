
import * as React from 'react';
import * as State from '../state';
import {connect} from '../reducts';

import {Icon} from './widgets'

export class NamespaceList extends React.Component<INamespaceListProps, any> {
    render() {
        return <ul className="c-assemblyList">
            {this.props.namespaces.map((ns) => {
                return <NamespaceListEntry key={ns.name} namespace={ns} />  
            })}
        </ul>
    }    
}

export class NamespaceListEntry extends React.Component<INamespaceListEntryProps, any> {
    render() {
        var className = 'c-namespaceListEntry';
        
        return <li className={className}>
            <Icon name="menu-right" />
            <Icon name="folder-close" />
            <span className="c-namespaceListEntry-text">
                {this.props.namespace.name || "<Root>"}
            </span>
        </li>;
    }
}

interface INamespaceListEntryProps {
    namespace?: State.Namespace
}

interface INamespaceListProps {
    namespaces?: State.Namespace[]
}