export class Emitter {
    constructor() {
        this.listeners = {}
    }

    //fire, trigger, dispatch
    // event happens, call related func
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) return

        this.listeners[event].forEach(listener => listener(...args))
    }

    //on listen
    // adding new listener
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)

        return () => {  // return function to unsubscribe
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)   // if array value == transferd function, clear it // это замыкание?
            console.log('UNSUBBED')
        }

    }



}

// const em = new Emitter()

// const un = em.subscribe('sup', (data) => console.log(data))

// em.emit('sup', 'hello')
// console.log(em.listeners['sup'])