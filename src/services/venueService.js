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

export const getVenues = async (page = 1, category, sort = 'default', city, features, title) => {
    // Define the parameters object
    const params = {
        page: page
    };

    // Only include the category parameter if it is defined
    if (category) {
        params.category = category;
    }

    // Only include the sort parameter if it is not 'default'
    if (sort !== 'default') {
        params.sort = sort;
    }

    // Only include the category parameter if it is defined
    if (city) {
        params.city = city;
    }

    // Only include the category parameter if it is defined
    if (features) {
        params.features = features.split(','); // Converting comma-separated string to array
    }

    if (title) {
        params.title = title;
    }

    try {
        const response = await axios.get(`${BASE_URL}/venues`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching venues:', error);
        throw error;
    }
};

export const getVenue = async (id) => {
    const response = await axios.get(`${BASE_URL}/venues/${id}`);
    return response.data;
}

// New function to create a review for a venue
export const createReviewForVenue = async (venueId, formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/venues/${venueId}/reviews`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating review for venue:', error);
        throw error;
    }
};
