export function mut<T>(state: T, new_values: T): T {
    return Object.assign({}, state, new_values);
}