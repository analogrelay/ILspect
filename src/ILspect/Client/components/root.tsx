import * as React from 'react';
import {connect} from 'react-redux';

import {Frame} from './layout/frame';
import {AssemblyList} from './assemblyList';
import {CodeView} from './codeView';

export class ILspectApp extends React.Component<any, any> {
    componentDidMount() {
        window.onresize = (event) => {
            this.forceUpdate();
        }
    }
    render() {
        var windowSize = { width: window.innerWidth, height: window.innerHeight };
        
        var assemblyListSize = 425;
        var spacing = 0;
        
        return <Frame width={windowSize.width} height={windowSize.height}>
             <Frame className="f-assemblyList" width={assemblyListSize} height={windowSize.height}>
                <AssemblyList />
             </Frame>
             <Frame className="f-codeView" left={assemblyListSize + spacing} width={windowSize.width - assemblyListSize - spacing} height={windowSize.height}>
                <CodeView />
             </Frame>
        </Frame>
    }
}