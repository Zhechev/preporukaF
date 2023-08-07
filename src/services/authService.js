    import axios from 'axios';

    const BASE_URL = process.env.VUE_APP_BASE_API_URL;

    let authToken = null;

    export async function login(authData) {
        const { data } = await axios.post(`${BASE_URL}/login`, authData);
        authToken = data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        return data;
    }

    export async function logout() {
        const response = await axios.post(`${BASE_URL}/logout`);
        authToken = null;
        delete axios.defaults.headers.common['Authorization'];
        return response.data;
    }

    export async function register(userData, lang) {
        await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);
        const { data } = await axios.post(`${BASE_URL}/register?lang=${lang}`, userData);
        return data;
    }

    export async function retrieveToken() {
        const { data } = await axios.post(`${BASE_URL}/get-token`);
        return data.token;
    }

    export async function getAuthenticatedUser(token) {
        const { data } = await axios.get(`${BASE_URL}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data;
    }