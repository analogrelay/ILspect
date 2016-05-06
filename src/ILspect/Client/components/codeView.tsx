import * as React from 'react';
import * as State from '../state';

import {connect} from '../reducts';

@connect<State.Application, ICodeViewProps>(
    (state) => ({ content: state.codeView.content })
)
export class CodeView extends React.Component<ICodeViewProps, any> {
    render() {
        return <pre className="c-codeView">
            {this.props.content}
        </pre>;
    }
}

interface ICodeViewProps {
    content?: string
}