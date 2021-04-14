export function capitalize(string) {
    if (typeof string !== 'string') return ''
    const ret = string.charAt(0).toUpperCase() + string.slice(1)
    return ret
}


export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    const range = new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)

    return range
}