import { range } from '@core/utils';
export function shouldResize(event) {
    return event.target.dataset.resize
}
export function isCell(event) {
    return event.target.dataset.type = "cell"
}

export function matrix($target, $current) {

    const target = $target.id(true)
    const current = $current.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, currentCell) {
    const keyActions = {
        ArrowRight: { type: 'col', value: 1 },
        ArrowLeft: { type: 'col', value: -1 },
        ArrowDown: { type: 'row', value: 1 },
        ArrowUp: { type: 'row', value: -1 },

        Enter: { type: 'row', value: 1 },
        Tab: { type: 'col', value: 1 },
    }

    const id = currentCell.id(true)
    const action = keyActions[key]

    if (action.type === 'col') {
        id.col = id.col + action.value < 0 ? 0 : id.col + action.value
    } else {
        id.row = id.row + action.value < 0 ? 0 : id.row + action.value
    }

    return `${id.row}:${id.col}`
}
