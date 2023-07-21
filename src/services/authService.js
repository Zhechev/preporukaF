import axios from 'axios';

export async function login(authData) {
    await axios.get('http://preporuka.zhechev.eu/sanctum/csrf-cookie');
    const { data } = await axios.post('http://preporuka.zhechev.eu/api/login', authData);
    return data;
}

export async function logout() {
    await axios.post('http://preporuka.zhechev.eu/api/logout');
}

export async function register(userData, lang) {
    await axios.get('http://preporuka.zhechev.eu/sanctum/csrf-cookie');
    const { data } = await axios.post(`http://preporuka.zhechev.eu/api/register?lang=${lang}`, userData);
    return data;
}