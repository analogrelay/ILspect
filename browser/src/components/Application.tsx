import * as React from 'react';

import { Tree, TreeNode } from './layout/Tree';

export class Application extends React.Component {
    render() {
        return <div className="row">
            <div id="split-leftPane" className="col" style={{maxWidth: 200}}>
                <Tree>
                    <TreeNode content="Root">
                        <TreeNode content="Child 1" />
                        <TreeNode content="Child 2" />
                        <TreeNode content="Child 3">
                            <TreeNode content="GrandChild 1" />
                            <TreeNode content="GrandChild 2" />
                        </TreeNode>
                    </TreeNode>
                </Tree>
            </div>
            <div id="split-rightPane" className="col" style={{left: 200}}>
                Right
            </div>
        </div>;
    }
}