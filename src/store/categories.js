import axios from 'axios'

const BASE_URL = process.env.VUE_APP_BASE_API_URL;

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
            return axios.get(`${BASE_URL}/categories`).then(({data})=>{
                commit('setCategories',data)
            })
        },
    }
}
