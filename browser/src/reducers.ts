import { combineReducers } from "redux";
import { ActionTypes, AppAction } from "./actions";
import { IApplicationState, IAssemblyState } from "./state";

function getName(path: string): string {
    const lastSlash = path.lastIndexOf("/");
    if (lastSlash >= 0) {
        return path.substring(lastSlash + 1);
    }
    return path;
}

const reducer = combineReducers({
    assemblies(state: IAssemblyState[] = [], action: AppAction): IAssemblyState[] {
        switch (action.type) {
            case ActionTypes.ADD_ASSEMBLIES:
                return [].concat(state, action.paths.map((path) => {
                    return {
                        name: getName(path),
                        path,
                    };
                }));
            default:
                return state;
        }
    },
});

export default reducer;
