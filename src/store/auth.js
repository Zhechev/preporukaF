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
        // async logout({commit}) {
        //     try {
        //         await logout();
        //         commit('SET_USER', {});
        //         commit('SET_AUTHENTICATED', false);
        //     } catch (error) {
        //         commit('SET_USER', {});
        //         commit('SET_AUTHENTICATED', false);
        //         console.error("Error logging out", error);
        //     }
        // },
        async logout({commit}) {
            try {
                const response = await logout();
                // Check the response message or status code from the backend
                if (response.message === 'Logged out successfully') {
                    commit('SET_USER', {});
                    commit('SET_AUTHENTICATED', false);
                    router.push({ name: 'login' }); // redirect to login page, if required
                } else {
                    console.error("Backend logout was not successful:", response.data.message);
                }
            } catch (error) {
                console.error("Error logging out");
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
