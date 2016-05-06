import * as React from 'react';
import * as State from '../state';
import {selectObject} from '../actionCreators';
import {connect} from '../reducts';

import {Icon} from './widgets';
import {Tree, TreeNode} from './layout/tree';

@connect<State.Application, IAssemblyListProps>(
    (state) => ({ assemblies: state.assemblyList.assemblies.toArray() }),
    { selectionChanged: selectObject }
)
export class AssemblyList extends React.Component<IAssemblyListProps, any> {
    select(obj: State.ModelBase) {
        this.props.selectionChanged && this.props.selectionChanged(obj);
    }

    render() {
        let renderMember = (m: State.Member) => {
            var children;
            if (State.memberIsType(m)) {
                children = m.members.map(renderMember)
            }

            var icon;

            switch (m.kind) {
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

            return <TreeNode key={m.name} icon={icon} text={m.name} onSelect={() => this.select(m) }>
                {children}
            </TreeNode>;
        }

        let renderNamespace = (ns: State.Namespace) => {
            return <TreeNode key={ns.name} icon="gift" text={ns.name || "<Default>" }>
                {ns.types ? ns.types.map(renderMember) : ""}
            </TreeNode>;
        }

        let renderAssembly = (assembly: State.Assembly) => {
            var className;
            if (assembly.status == State.AssemblyStatus.Loading) {
                className = 'c-assemblyListEntry-loading';
            }
            return <TreeNode key={assembly.name} className={className} icon="book" text={assembly.name || "Loading..."}>
                {assembly.namespaces ? assembly.namespaces.map(renderNamespace) : ""}
            </TreeNode>;
        }

        return <Tree className="c-assemblyList">
            {this.props.assemblies.map(renderAssembly) }
        </Tree>
    }
}

interface IAssemblyListProps {
    assemblies?: State.Assembly[]
    selectionChanged?: (newSelection: State.ModelBase) => void
}