import {Store} from '../main';
import {AppState} from '../state/app';
import {redux} from '../aurelia-redux';

@redux() export class App {
    message = "Hello, World";
}