import axios from 'axios'

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
            return axios.get('https://preporuka.zhechev.eu/api/cities').then(({data})=>{
                commit('setCities',data)
            })
        },
    }
}
