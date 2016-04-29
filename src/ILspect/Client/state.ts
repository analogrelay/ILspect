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
    namespaces?: Namespace[]
}

export interface Namespace {
    name?: string
    types?: Type[]
}

export enum MemberKind
{
    Field,
    Method,
    Property,
    Event,
    Type
}

export interface Member {
    name?: string,
    kind?: MemberKind
}

export interface Type extends Member {
    members?: Member[]
}

export function memberIsType(m: Member): m is Type {
    return m.kind == MemberKind.Type;
}

export enum AssemblyStatus {
    Loading,
    Loaded
}