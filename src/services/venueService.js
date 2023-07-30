import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BASE_API_URL;

export const createVenue = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/venues`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating venue:', error);
        throw error;
    }
};

export const getVenues = async (page = 1, filter = 'default') => {
    try {
        const response = await axios.get(`${BASE_URL}/venues`, {
            params: {
                page: page,
                filter: filter
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching category venues:', error);
        throw error;
    }
};
