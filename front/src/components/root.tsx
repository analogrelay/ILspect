import * as React from 'react';
import {connect} from 'react-redux';

import {Frame} from './layout/frame';

export class ILspectApp extends React.Component<any, any> {
    componentDidMount() {
        window.onresize = (event) => {
            this.forceUpdate();
        }
    }
    render() {
        var windowSize = { width: window.innerWidth, height: window.innerHeight };
        
        return <Frame width={windowSize.width} height={windowSize.height}>    
        </Frame>
    }
}