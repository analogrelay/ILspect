import * as Reducts from './reducts';

import * as State from './state';

export var AddingAssembly = new Reducts.ActionType<string[]>("ASSEMBLYLIST_ADDING");
export var ResolvedAssemblies = new Reducts.ActionType<State.Assembly[]>("ASSEMBLYLIST_RESOLVED");