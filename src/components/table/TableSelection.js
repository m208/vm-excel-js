import { $ } from '@core/dom';
export class TableSelection {
    static className = 'selected'
    constructor() {
        this.selected = []
        this.current = null
    }
    clearSelection() {
        this.selected.forEach($cell => $cell.removeClass(TableSelection.className))
        this.selected = []
        //this.current = null
    }
    select($cell) {
        this.clearSelection()

        this.selected.push($cell)
        this.current = $cell
        $cell.addClass(TableSelection.className)
        $cell.focus()
    }
    selectGroup($cells) {
        this.clearSelection()
        this.selected = $cells
        this.selected.forEach($cell => $cell.addClass(TableSelection.className))

    }

    focus() { }

    applyStyle(style) {
        this.selected.forEach($el => $el.css(style))
    }

    get selectedIds() {
        return this.selected.map($el => $el.id())
    }

}