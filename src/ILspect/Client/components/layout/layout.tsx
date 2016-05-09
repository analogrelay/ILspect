import * as React from 'react';

export abstract class LayoutComponent<TProps> extends React.Component<TProps, any> implements ILayoutComponent, React.ChildContextProvider<any> {
    private _childContext: any;

    constructor(props: any, context: any) {
        super(props, context);

        this._childContext = Object.assign({}, this.context, {
            currentLayoutContext: { }
        });
    }

    protected abstract measure(availableSize: { width: number, height: number });
}