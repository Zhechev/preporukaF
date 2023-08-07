import router from '@/router'
import { login, logout, register, getAuthenticatedUser, retrieveToken } from '../services/authService';


export default {
    namespaced: true, // This means that the module is namespaced. With this, you'll access the module's state, getters, actions, etc. with a prefix based on its module name.
    state:{ // Defining the state
        authenticated:false,
        user:{},
        token:{}
    },
    getters:{ // Simply return their respective state properties.
        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        },
        token(state) {
            return state.token
        }
    },
    mutations:{ // These are synchronous functions that change the state.
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
    },
    actions:{
        async login({commit}, authData) {
            try {
                const data = await login(authData);

                // Commit mutation to update user and authenticated state 
                commit('SET_USER', data.user);
                commit('SET_AUTHENTICATED', true);
                commit('SET_TOKEN', data.token); // Store the token
                router.push({ name: 'home' }); // redirect
            } catch (error) {
                commit('SET_USER', {});
                commit('SET_AUTHENTICATED', false);
                if (error.response && error.response.data) {
                    throw error.response.data;
                } else {
                    throw new Error('An unexpected error occurred.');
                }
            }
            
        },
        async retrieveTokenAndLogin({ commit }) {
            try {
                // First, get the token from Laravel backend
                const token = await retrieveToken();
        
                if (!token) {
                    throw new Error("Token not received");
                }
        
                commit('SET_TOKEN', token);
                
                // Use the token to fetch the authenticated user
                const userData = await getAuthenticatedUser(token);

                console.log(userData);
                alert(1);
                
                commit('SET_USER', userData.user);
                commit('SET_AUTHENTICATED', true);
                
                router.push({ name: 'home' });
            } catch (error) {
                console.error("Error retrieving token or user data:", error);
                commit('SET_USER', {});
                commit('SET_AUTHENTICATED', false);
                router.push({ name: 'login' });
            }
        },
        async logout({commit}) {
            try {
                const response = await logout();
                // Check the response message or status code from the backend
                if (response.message === 'Logged out successfully') {
            
                    // Reset the Vuex state
                    commit('SET_USER', {});
                    commit('SET_AUTHENTICATED', false);
                    commit('SET_TOKEN', {});
                    
                    // Redirect to login page
                    router.push({ name: 'login' }); 
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
