<<<<<<< HEAD

import { ExcelComponent } from '../../core/ExcelComponent';
import { shouldResize } from './table.functions';
import { resizeHandler } from './table.resizing';
=======
import { ExcelComponent } from '../../core/ExcelComponent';
>>>>>>> 35929a74fb62449686e29b83f96081bb8eb9870a
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'
<<<<<<< HEAD

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

=======
  toHTML() {
    return createTable(20)
  }
>>>>>>> 35929a74fb62449686e29b83f96081bb8eb9870a
}
