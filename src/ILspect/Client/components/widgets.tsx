import * as React from 'react';

export class Icon extends React.Component<IIconProps, any> {
    render() {
        var className = `glyphicon glyphicon-${this.props.name}`;
        if (this.props.className) {
            className += " " + this.props.className;
        }
        var props = Object.assign({}, this.props, { className: className });

        return <span aria-hidden={true} {... props} />;
    }
}

interface IIconProps extends React.HTMLAttributes {
    name: string
}