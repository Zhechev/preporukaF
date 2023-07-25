import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BASE_API_URL;

export async function login(authData) {
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);
    const { data } = await axios.post(`${BASE_URL}/login`, authData);
    return data;
}

export async function logout() {
    await axios.post(`${BASE_URL}/logout`);
}

export async function register(userData, lang) {
    await axios.get(`${BASE_URL}sanctum/csrf-cookie`);
    const { data } = await axios.post(`${BASE_URL}/register?lang=${lang}`, userData);
    return data;
}