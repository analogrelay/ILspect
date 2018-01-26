export interface IApplicationState {
    assemblies: IAssemblyState[];
}

export interface IAssemblyState {
    name: string;
    path: string;
}
