import { Action } from "redux";
import { IAssemblyState } from "./state";

export type AppAction = IAddAssembliesAction;

export enum ActionTypes {
    ADD_ASSEMBLIES = "ADD_ASSEMBLIES",
    ADDED_ASSEMBLY = "ADDED_ASSEMBLY",
}

export interface IAddAssembliesAction extends Action {
    type: ActionTypes.ADD_ASSEMBLIES;
    paths: string[];
}

export const addAssemblies = (paths: string[]): IAddAssembliesAction => ({
    paths,
    type: ActionTypes.ADD_ASSEMBLIES,
});

export interface IAddedAssemblyAction extends Action {
    type: ActionTypes.ADDED_ASSEMBLY;
    asm: IAssemblyState,
}

export const addedAssembly = (asm: IAssemblyState): IAddedAssemblyAction => ({
    asm,
    type: ActionTypes.ADDED_ASSEMBLY,
});
