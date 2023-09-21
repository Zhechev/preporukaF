    import axios from 'axios';

    const BASE_URL = process.env.VUE_APP_BASE_API_URL;
    axios.defaults.withCredentials = true;



    export async function login(authData) {
        await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);
        const { data } = await axios.post(`${BASE_URL}/login`, authData);
        return data;
    }

    export async function logout() {
        const response = await axios.post(`${BASE_URL}/logout`);

        delete axios.defaults.headers.common['Authorization'];
        return response.data;
    }

    export async function register(userData, lang) {
        await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);
        const { data } = await axios.post(`${BASE_URL}/register?lang=${lang}`, userData);
        return data;
    }

    export async function getAuthenticatedUser() {
        const { data } = await axios.get(`${BASE_URL}/user`);
        return data;
    }