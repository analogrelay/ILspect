import * as React from 'react';

export interface ILayoutComponent {
    props: ILayoutProps
}

export interface ILayoutProps {
    layoutContext?: LayoutContext
}

export class LayoutContext {
    constructor(public parent: ILayoutComponent) {}
}

export class LayoutComponent<TProps extends ILayoutProps> extends React.Component<TProps, any> implements ILayoutComponent {
    get parent(): ILayoutComponent { return this.props.layoutContext.parent; }
} 