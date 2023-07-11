import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import categories from '@/store/categories'
import cities from '@/store/cities'

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth,
        categories,
        cities,
    }
})

export default store
