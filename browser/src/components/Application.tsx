import * as React from 'react';

import { Tree, TreeNode } from './layout/tree';

export class Application extends React.Component {
    render() {
        return <div className="row">
            <div id="split-leftPane" className="col" style={{maxWidth: 200}}>
            </div>
            <div id="split-rightPane" className="col" style={{left: 200}}>
                Right
            </div>
        </div>;
    }
}