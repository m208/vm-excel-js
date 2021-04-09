import { capitalize } from "./utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) throw new Error('no root element provided')
        this.$root = $root
        this.listeners = listeners
        this.eventHandlers = {}
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name} component`)
            }
            this.eventHandlers[method] = this[method].bind(this)
            this.$root.on(listener, this.eventHandlers[method])

        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this.eventHandlers[method])
        })
    }

}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}
