import router from '@/router'
import { login, logout, register } from '../services/authService';


export default {
    namespaced: true,
    state:{
        authenticated:false,
        user:{}
    },
    getters:{
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        }
    },
    mutations:{
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        }
    },
    actions:{
        async login({commit}, authData) {
            try {
                const data = await login(authData);
                commit('SET_USER', data.user);
                commit('SET_AUTHENTICATED', true);
                router.push({ name: 'home' });
            } catch ({ response: { data } }) {
                commit('SET_USER', {});
                commit('SET_AUTHENTICATED', false);
            }
        },
        async logout({commit}) {
            try {
                await logout();
                commit('SET_USER', {});
                commit('SET_AUTHENTICATED', false);
                router.push({ name: 'home' });
            } catch (error) {
                commit('SET_USER', {});
                commit('SET_AUTHENTICATED', false);
            }
        },
        async register({dispatch}, {userData, lang}) {
            try {
                await register(userData, lang);
                dispatch('login', userData);
            } catch (error) {
                console.log(error.response.data);
                throw error; // <- add this line
            }
        },        
    }
    
}
