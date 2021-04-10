export function capitalize(string) {
    if (typeof string !== 'string') return ''
    const ret = string.charAt(0).toUpperCase() + string.slice(1)
    return ret
}