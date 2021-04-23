import { ExcelComponent } from '@core/ExcelComponent';
import * as actions from '../../redux/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['tableName'],
      ...options
    })
    this.$root = $root
  }

  onInput(event) {
    const text = event.target.value.trim()
    this.$dispatch(actions.changeHeader(text))
  }

  toHTML() {
    const tableName = this.store.getState().tableName
    return `<input type="text" class="input" value="${tableName}" />
        <div>
          <div class="button">
            <i class="material-icons">delete</i>
          </div>
          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>
        </div>`
  }
}
