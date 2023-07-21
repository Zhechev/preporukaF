import axios from 'axios'

export default {
    namespaced: true,
    state:{
        categories:{}
    },
    getters:{
        categories(state) {
            return state.categories
        }
    },
    mutations:{
        setCategories (state, value) {
            state.categories = value
        }
    },
    actions:{
        async categories({commit}){
            return axios.get('http://localhost:8000/api/categories').then(({data})=>{
                commit('setCategories',data)
            })
        },
    }
}
