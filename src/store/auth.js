import router from '@/router'
import { login, logout, register } from '../services/authService';


export default {
    namespaced: true, // This means that the module is namespaced. With this, you'll access the module's state, getters, actions, etc. with a prefix based on its module name.
    state:{ // Defining the state
        authenticated:false,
        user:{}
    },
    getters:{ // Simply return their respective state properties.
        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        }
    },
    mutations:{ // These are synchronous functions that change the state.
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

                // Commit mutation to update user and authenticated state 
                commit('SET_USER', data.user);
                commit('SET_AUTHENTICATED', true);
                router.push({ name: 'home' }); // redirect
            } catch ({ response: { data } }) {
                commit('SET_USER', {});
                commit('SET_AUTHENTICATED', false);
            }
        },
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
