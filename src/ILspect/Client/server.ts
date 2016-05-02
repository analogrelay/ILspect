export interface ApiError {
    type?: string
    message?: string
    details?: string
}

export interface ApiResponse<T> extends ServerObject {
    success: boolean
    error?: ApiError
    result?: T
}

export interface ServerObject {
    id?: string
}

export interface AssemblyModel extends ServerObject
{
    name?: string
    path?: string
    hasMetadata?: boolean,
    namespaces?: NamespaceModel[]
}

export interface NamespaceModel extends ServerObject
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

export interface MemberModel extends ServerObject
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