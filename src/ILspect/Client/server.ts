export interface ApiError {
    type?: string
    message?: string
    details?: string
}

export interface ApiResponse<T> {
    id?: string
    success: boolean
    error?: ApiError
    result?: T
}

export interface ModelBase {
    url?: string
    disassemblyUrl?: string
}

export interface AssemblyModel extends ModelBase
{
    id?: string
    name?: string
    path?: string
    hasMetadata?: boolean,
    namespaces?: NamespaceModel[]
}

export interface NamespaceModel extends ModelBase
{
    name?: string
    types?: TypeModel[]
}

export enum MemberKind
{
    Field,
    Method,
    Property,
    Event,
    Type
}

export interface MemberModel extends ModelBase
{
    name?: string,
    kind?: MemberKind
}

export function memberIsType(m: MemberModel): m is TypeModel {
    return m.kind == MemberKind.Type;
}

export interface TypeModel extends MemberModel
{
    members?: MemberModel[]
}