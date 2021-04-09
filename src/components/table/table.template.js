const CODES = {
    A: 65,
    Z: 90
}

function toCell(content) {
    return `<div class="cell" contenteditable>${content}</div>`
}

function toColumn(content) {
    return `<div class="column">${content}</div>`
}

function createRow(content, index = '') {
    return `<div class="row">
                <div class="row-info">${index}</div>
                <div class="row-data">${content}</div>
            </div>`
}
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 10) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(cols))


    const rowCells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(rowCells, i + 1))
    }

    return rows.join('')
}