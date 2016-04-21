import * as React from 'react';

export class Icon extends React.Component<IIconProps, any> {
    render() {
        var className = `glyphicon glyphicon-${this.props.name}`;
        return <span className={className} ariaHidden={true} />;
    }
}

interface IIconProps {
    name: string
}