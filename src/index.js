import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './scss/index.scss'

import { Excel } from '@/components/excel/Excel'
import { Header } from './components/header/Header'
import { Toolbar } from './components/toolbar/Toolbar'
import { Formula } from './components/formula/Formula'
import { Table } from './components/table/Table'
import { createStore, Store } from './core/createStore'
import { rootReducer } from './redux/rootReducer'
import { storage, debounce } from './core/utils'
import { initialState } from './redux/initialState'


const store = new Store(rootReducer, initialState)

const stateListener = debounce(state => {
    storage('excel-state', state)
    console.log('AppState', state);
}, 300)

store.subscribe(stateListener)


const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()