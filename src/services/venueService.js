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

