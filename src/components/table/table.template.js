const CODES = {
    A: 65,
    Z: 90
}

function toCell(row, col) {
    return `<div class="cell" 
            contenteditable data-col = "${col}" 
            data-type = "cell" 
            data-id="${row}:${col}"></div>`
}

// function toCell(row) {
//     return function (_, col) {
//         return `<div class="cell" contenteditable data-col = "${col + 1}" data-row="${row + 1}"></div>`
//     }
// }

function toColumn(content, index) {
    return `<div class="column" data-resizeable data-col = "${index}">
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

    for (let row = 0; row < rowsCount; row++) {

        const rowCells = new Array(colsCount)
            .fill('')
            .map((_, col) => toCell(row, col))
            //.map(toCell(row))   // разобраться дополнительно
            .join('')

        rows.push(createRow(rowCells, row + 1))
    }

    return rows.join('')
}