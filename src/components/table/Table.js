import { $ } from '@core/dom';
import { defaultStyles } from '../../constants';
import { ExcelComponent } from '../../core/ExcelComponent';
import { parse } from '../../core/parse';
import { debounce } from '../../core/utils';
import * as actions from '../../redux/actions';

import { isCell, matrix, nextSelector, shouldResize } from './table.functions';
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
    return createTable(20, this.store.getState())
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()

    const $cell = this.$root.find('[data-id = "0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', value => {
      this.selection.current.attr('data-value', value)
      console.log(parse(value));
      this.selection.current.text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:enter', () => this.selection.current.focus())

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyles({
        value,
        ids: this.selection.selectedIds
      }))



    })

  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:cell-select', $cell)

    const styles = $cell.getStyles(Object.keys(defaultStyles))
    //console.log('Styles to dispatch', styles)
    this.$dispatch(actions.changeStyles(styles))
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())

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

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root)
      console.log(data);
      this.$dispatch(actions.tableResize(data))
    } catch (e) { }

  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
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


