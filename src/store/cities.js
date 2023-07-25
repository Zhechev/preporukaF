import axios from 'axios'

const BASE_URL = process.env.VUE_APP_BASE_API_URL;

export default {
    namespaced: true,
    state:{
        cities:{}
    },
    getters:{
        cities(state) {
            return state.cities
        }
    },
    mutations:{
        setCities (state, value) {
            state.cities = value
        }
    },
    actions:{
        async cities({commit}) {
            return axios.get(`${BASE_URL}/cities`).then(({data})=>{
                commit('setCities',data)
            })
        },
    }
}
