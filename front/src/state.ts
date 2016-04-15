import * as Immutable from 'immutable';

export interface Application {
    assemblyList?: AssemblyList;
}

export interface AssemblyList {
    assemblies?: Immutable.List<Assembly>
}

export interface Assembly {
    name?: string
    path?: string
    status?: AssemblyStatus
}

export enum AssemblyStatus {
    Loading,
    Loaded
}