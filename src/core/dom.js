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
    }
    removeClass(value) {
        const list = value.split(',').map((item) => item.trim())
        this.$el.classList.remove(...list)
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

    text(value) {
        if (value) this.$el.textContent = value
        else return this.$el.textContent
    }


    css(styles = {}) {
        Object.assign(this.$el.style, styles);
        // for (const [key, val] of Object.entries(styles)) {
        //     if (this.$el.style.hasOwnProperty(key)) this.$el.style[key] = val
        // }
        return this
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