import { $ } from '@core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';

import { nextSelector, matrix, shouldResize } from './table.functions';
import { isCell } from './table.functions';
import { resizeHandler } from './table.resizing';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.$root = $root
  }

  toHTML() {
    return createTable(20)
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()

    const $cell = this.$root.find('[data-id = "0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (data) => this.selection.current.text(data))

    this.$on('formula:enter', () => this.selection.current.focus())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:cell-select', $cell)
  }

  onInput(event) {
    this.$emit('table:cell-select', $(event.target))
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const next = nextSelector(event.key, this.selection.current)

      const $next = this.$root.find(`[data-id = "${next}"]`)
      this.selectCell($next)
    }


  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    } else if (isCell(event)) {
      if (event.shiftKey) {
        const target = $(event.target)
        const $cells = matrix(target, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      }
      else {
        this.selectCell($(event.target))
      }
    }
  }

}


