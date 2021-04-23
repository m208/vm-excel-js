class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector) : selector
    }


    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }

        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }


    append(node) {
        if (node instanceof Dom) node = node.$el

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    addClass(value) {
        const list = value.split(',').map((item) => item.trim())
        this.$el.classList.add(...list)
        return this
    }
    removeClass(value) {
        const list = value.split(',').map((item) => item.trim())
        this.$el.classList.remove(...list)
        return this
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }
    findAll(selector) {
        const nodeList = []
        this.$el.querySelectorAll(selector).forEach(el => {
            nodeList.push($(el))
        })
        return nodeList
    }

    height(value) {
        if (value) this.$el.style.height = value + 'px'
        else return this.$el.style.height
    }

    width(value) {
        if (value) this.$el.style.width = value + 'px'
        else return this.$el.style.width
    }
    get data() {
        return this.$el.dataset
    }
    id(parse) {
        if (!parse) return this.$el.dataset.id

        const parsedId = this.id().split(':')  // recursia
        return {
            row: +parsedId[0],
            col: +parsedId[1]
        }

    }

    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }

    focus() {
        this.$el.focus()
        return this
    }

    text(text) {
        if (typeof text === 'string' || typeof text === 'number') {
            this.$el.textContent = text
            return this
        } else return this.$el.textContent
    }


    css(styles = {}) {
        Object.assign(this.$el.style, styles);
        return this
    }

    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }

}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) el.classList.add(classes)
    return $(el)
}