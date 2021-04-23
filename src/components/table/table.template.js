import { defaultStyles } from '@/constants'
import { camelToDashCase } from '@core/utils'
import { toInlineStyles } from '@core/utils'
import { parse } from '../../core/parse'

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = '120px'
const DEFAULT_HEIGHT = '24px'


function getWidth(state, index) {
    if (state) return state[index] || DEFAULT_WIDTH
    return DEFAULT_WIDTH
}


function getHeight(state, index) {
    if (state) return state[index] || DEFAULT_HEIGHT
    return DEFAULT_HEIGHT
}

function toCell(state, row) {
    return function (_, col) {
        const width = getWidth(state.colState, col)
        const id = `${row}:${col}`
        const data = state.dataState[id] || ''
        //const styles = toInlineStyles(...defaultStyles, ...state.stylesState[id])   // способ конкатенации объектов
        const styles = toInlineStyles(Object.assign(defaultStyles, state.stylesState[id]))   // способ конкатенации объектов

        return `
        <div 
          class="cell" 
          contenteditable 
          data-col="${col}"
          data-type="cell"
          data-id="${id}"
          data-value = "${data || ''}"
          style="${styles}; width: ${width}"
        >${parse(data) || ''}</div>`
    }
}

// function toCell(row) {
//     return function (_, col) {
//         return `<div class="cell" contenteditable data-col = "${col + 1}" data-row="${row + 1}"></div>`
//     }
// }


function toColumn({ col, index, width }) {
    return `<div class="column" data-resizeable data-col = "${index}" style = "width: ${width};">
                ${col}
                <div class="col-resize" data-resize = "col"></div>
            </div>`
}

function createRow(content, index = '', height = 'none') {
    const resize = index ? '<div class="row-resize" data-resize = "row"></div>' : ''
    return `<div class="row" data-resizeable data-row = "${index}" style = "height: ${height}">
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
function withWidthFrom(state) {
    return function (col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 10, state = {}) {

    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        // .map((col, index) => {
        //     const width = getWidth(state.colState, index)
        //     return toColumn(col, index, width)
        // })
        .join('')


    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++) {

        const rowCells = new Array(colsCount)
            .fill('')
            //.map((_, col) => toCell(row, col))
            //.map(toCell(row))   // разобраться дополнительно
            .map(toCell(state, row))
            .join('')

        const height = getHeight(state.rowState, row + 1)
        rows.push(createRow(rowCells, row + 1, height))
    }

    return rows.join('')
}