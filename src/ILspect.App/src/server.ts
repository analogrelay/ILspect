export interface ApiError {
    type?: string
    message?: string
    details?: string
}

export interface ApiResponse<T> {
    id: string
    success: boolean
    error?: ApiError
    result?: T
}

export interface AssemblyModel
{
    id?: string
    name?: string
    path?: string
    hasMetadata?: boolean,
    namespaces?: NamespaceModel[]
}

export interface NamespaceModel
{
    name?: string
    types?: TypeModel[]
}

export interface TypeModel
{
    name?: string
}