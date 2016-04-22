import * as React from 'react';

export class Icon extends React.Component<IIconProps, any> {
    render() {
        var className = `glyphicon glyphicon-${this.props.name}`;

        var props = Object.create(this.props.className);
        if (props.className) {
            props.className = className + " " + props.className;
        } else {
            props.className = className;
        }

        return <span className={className} aria-hidden={true} {...props} />;
    }
}

interface IIconProps extends React.HTMLAttributes {
    name: string
}