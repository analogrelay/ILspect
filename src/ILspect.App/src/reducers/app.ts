import * as State from '../state';
import {MultiReducer} from '../reducts';
import {AssemblyListReducer} from './assemblyList';

export class ApplicationReducer extends MultiReducer<State.Application> {
    public assemblyList = new AssemblyListReducer();
}