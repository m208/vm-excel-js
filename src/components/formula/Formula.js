import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
        this.$root = $root
    }

    toHTML() {
        return `<div class="info">fx</div>
                <div id = "formula" class="input" contenteditable spellcheck="false">
                </div>`
    }

    init() {
        super.init()

        const $formula = this.$root.find('#formula')
        this.$on('table:cell-select', ($cell) => {
            $formula.text($cell.text())
        })
    }

    onInput(event) {
        const text = event.target.textContent.trim()
        this.$emit('formula:input', text)
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:enter')
        }
    }

}
