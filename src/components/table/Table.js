
import { ExcelComponent } from '../../core/ExcelComponent';
import { shouldResize } from './table.functions';
import { resizeHandler } from './table.resizing';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
    this.$root = $root
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    }
  }

}
