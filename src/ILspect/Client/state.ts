import * as Immutable from 'immutable';

export interface Application {
    assemblyList?: AssemblyList;
    codeView: CodeView
}

export interface CodeView {
    content: string
}

export interface AssemblyList {
    assemblies?: Immutable.List<Assembly>
}

export interface ModelBase {
    url?: string
    disassemblyUrl?: string
}

export interface Assembly extends ModelBase {
    id?: string
    name?: string
    path?: string
    status?: AssemblyStatus
    namespaces?: Namespace[]
}

export interface Namespace extends ModelBase {
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

export interface Member extends ModelBase {
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