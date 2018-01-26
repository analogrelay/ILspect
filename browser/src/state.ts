export interface ApplicationState {
    assemblies: AssemblyState[]
}

export interface AssemblyState {
    name: string,
    path: string,
}

export const INITIAL_STATE: ApplicationState = {
    assemblies: []
};