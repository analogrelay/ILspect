import * as State from '../state';
import {MultiReducer} from '../reducts';
import {AssemblyListReducer} from './assemblyList';
import {CodeViewReducer} from './codeView';

export class ApplicationReducer extends MultiReducer<State.Application> {
    public assemblyList = new AssemblyListReducer();
    public codeView = new CodeViewReducer();
}