import axios from 'axios';

export async function login(authData) {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    const { data } = await axios.post('http://localhost:8000/api/login', authData);
    return data;
}

export async function logout() {
    await axios.post('http://localhost:8000/api/logout');
}

export async function register(userData, lang) {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    const { data } = await axios.post(`http://localhost:8000/api/register?lang=${lang}`, userData);
    return data;
}