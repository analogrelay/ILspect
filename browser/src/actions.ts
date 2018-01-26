import { Action, AnyAction } from "redux";
import { IAssemblyState } from "./state";

export interface IAddAssembliesAction extends Action {
    paths: string[];
}

function addAssemblies(paths: string[]): IAddAssembliesAction {
    return {
        paths,
        type: "ADD_ASSEMBLIES",
    };
}
