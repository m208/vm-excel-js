const CODES = {
    A: 65,
    Z: 90
}

function toCell(content, index) {
    return `<div class="cell" contenteditable data-col = "${index + 1}">${content}</div>`
}

function toColumn(content, index) {
    return `<div class="column" data-resizeable data-col = "${index + 1}">
                ${content}
                <div class="col-resize" data-resize = "col"></div>
            </div>`
}

function createRow(content, index = '') {
    const resize = index ? '<div class="row-resize" data-resize = "row"></div>' : ''
    return `<div class="row" data-resizeable>
                <div class="row-info">
                    ${index}
                    ${resize}
                </div>
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