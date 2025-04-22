import axios from 'axios';
import { Platform } from 'react-native';

const API_BASE_URL =
  Platform.OS === 'android' ? 'http://192.168.179.110:3000' : 'http://192.168.179.110:3000';

export const fetchCurrentUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/users/me`, {
    withCredentials: true,
  });
  return response.data;
};
