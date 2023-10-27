import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BASE_API_URL;

// Fetch user details along with the venues_owned_count
export const fetchUserDetails = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/profile/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

export const fetchUserNotifications = async (userId, page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/profile/${userId}/notifications?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user notifications:', error);
        throw error;
    }
};
