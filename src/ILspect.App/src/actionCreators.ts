import * as Actions from './actionTypes';
import * as State from './state';

export function addAssemblies(paths: string[]) {
    return async (dispatch: Redux.Dispatch) => {
        dispatch(Actions.AddingAssembly.create(paths));
        let resp = await fetch("~/api/assemblies", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paths)
        });
        dispatch(Actions.ResolvedAssemblies.create(await resp.json<State.Assembly[]>()));
    };
}