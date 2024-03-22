import AsyncStorage from "@react-native-async-storage/async-storage";
import api from './api'; // Import instance from api.js

// Hàm lưu trữ accessToken vào AsyncStorage
const storeAccessToken = async (accessToken) => {
    try {
        await AsyncStorage.setItem('accessToken', accessToken);
    } catch (error) {
        console.error('Error storing accessToken:', error);
    }
};

// Hàm lấy thông tin người dùng bằng accessToken
export const getUserInfo = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            const response = await api.get('/user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } else {
            throw new Error('accessToken not found');
        }
    } catch (error) {
        throw new Error('Error fetching user info:', error);
    }
};

// Hàm đăng nhập và lưu trữ accessToken
export const loginUser = async (username, password, driverId) => {
    try {
        const response = await api.post('/Login', { username, password, driverId});
        const accessToken = response.data.accessToken;
        await storeAccessToken(accessToken);
        return response.data;
    } catch (error) {
        throw new Error('Error logging in:', error);
    }
};

export const getUserByAccountId = async (accountId) => {
  try {
    // Gọi API để lấy thông tin người dùng với accountId cụ thể
    const response = await api.get(`/Drivers?accountId=${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error('Error fetching user info:', error);
  }
};