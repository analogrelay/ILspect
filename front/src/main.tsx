import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ILspectApp} from './app';
import {createStore} from 'redux';

export function start(baseUrl: string)
{
    ReactDOM.render(
        <ILspectApp baseUrl={baseUrl} />,
        document.getElementById('app-root')
    );
}
