import * as React from 'react'
import {ILayoutProps,LayoutComponent,LayoutContext} from './layout';

export class Frame extends LayoutComponent<IFrameProps> {
    get currentSize() {
        return { width: this.props.width, height: this.props.height };
    }

    render() {
        let top = this.props.top || 0;
        let left = this.props.left || 0;

        var style = {
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            top: `${top}px`,
            left: `${left}px`,
            position: 'absolute'
        };

        var newChildren = React.Children.map(this.props.children, (child) => {
            if (React.isValidElement<any>(child)) {
                return React.cloneElement(child, {
                    layoutContext: new LayoutContext(this)
                });
            }
            return child;
        });

        return <div className={this.props.className} style={style}>
            {newChildren}
        </div>
    }
}

interface IFrameProps extends ILayoutProps {
    width: number,
    height: number,
    top?: number,
    left?: number,
    className?: string
}