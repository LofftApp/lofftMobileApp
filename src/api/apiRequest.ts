import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiRequest = axios.create({
  headers: {
    ContentType: 'application/json',
    Authorization: AsyncStorage.getItem('token'),
  },
});
