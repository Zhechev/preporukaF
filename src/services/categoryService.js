import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BASE_API_URL;

export const getCategories = async (page = 1, filterCat) => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`, {
            params: {
                page: page,
                filter: filterCat
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};