import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import categories from '@/store/categories'
import cities from '@/store/cities'

const store = createStore({
    plugins:[
        createPersistedState() // by default stores Vuex state in localStorage. This plugin is specifically designed to help keep your Vuex state across page reloads.
    ],
    modules:{
        auth,
        categories,
        cities,
    }
})

export default store
