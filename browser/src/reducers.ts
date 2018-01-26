import { AnyAction, combineReducers } from "redux";
import { AddAssembliesAction } from "./actions";
import { IApplicationState, IAssemblyState } from "./state";

function getName(path: string): string {
    const lastSlash = path.lastIndexOf("/");
    if (lastSlash >= 0) {
        return path.substring(lastSlash + 1);
    }
    return path;
}

const reducer = combineReducers({
    assemblies(state: IAssemblyState[] = [], action: AnyAction): IAssemblyState[] {
        if (AddAssembliesAction.is(action)) {
            return [].concat(state, action.paths.map((path) => {
                return {
                    name: getName(path),
                    path,
                };
            }));
        } else {
            return state;
        }
    },
});

export default reducer;
