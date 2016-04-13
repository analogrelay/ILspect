import * as React from 'react';

interface ILayoutComponent {
    currentSize: { width: number, height: number };
}

interface ILayoutContext {
    parent: ILayoutComponent,
}

interface IFrameProperties {
    width: number,
    height: number,
    className?: string
}

export class Frame extends React.Component<IFrameProperties, any> {
    render() {
        var style = {
            width: `${this.props.width}px`,
            height: `${this.props.height}px`
        };
        
        var newChildren = React.Children.map(this.props.children, (child) => {
            if (React.isValidElement<any>(child)) {
                return React.cloneElement(child, {
                    layoutContext:  
                });
            }
        })
    }
}