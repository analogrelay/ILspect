import * as React from 'react'
import {LayoutComponent,LayoutContext} from './layout';

export class Viewport extends LayoutComponent<any> {
    render() {
        let top = this.props.top || 0;
        let left = this.props.left || 0;

        var style = {
            width: `${window.innerWidth}px`,
            height: `${window.innerHeight}px`,
            top: '0px',
            left: '0px',
            position: 'absolute'
        };

        var newChildren = React.Children.map(this.props.children, (child) => {
            if (React.isValidElement<any>(child)) {
            }
            return child;
        });

        return <div className={this.props.className} style={style}>
            {newChildren}
        </div>
    }
}