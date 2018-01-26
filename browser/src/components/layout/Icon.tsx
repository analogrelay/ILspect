import * as React from "react";

type IconSize = "lg" | "2x" | "3x" | "4x" | "5x";
type IconAnimation = "spin" | "pulse";

export interface IconProps {
    name: string;
    size?: IconSize;
    animation?: IconAnimation;
    listItem?: boolean;
}

export class Icon extends React.Component<IconProps> {
    public render() {
        let className = `fa fa-${this.props.name}`;

        if (this.props.size) {
            className += ` fa-${this.props.size}`;
        }

        if (this.props.animation) {
            className += ` fa-${this.props.animation}`;
        }

        if (this.props.listItem) {
            className += " fa-li";
        }

        return <span className={className}></span>;
    }
}
