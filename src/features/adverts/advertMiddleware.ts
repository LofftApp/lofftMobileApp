import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiRequest} from '@Api/apiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAdverts = createAsyncThunk(
  'advert/fetchAdverts',
  async (token: any) => {
    // development url
    const url = 'http://localhost:3000/api/adverts';
    console.log('token:', await AsyncStorage.getItem('token'));
    // try {
    //   const response = await axios.get(url, {
    //     headers: {
    //       ContentType: 'application/json',
    //       Authorization: token,
    //     },
    //   });
    //   return response.data;
    // } catch (error) {
    //   console.log('fetchFlats error:', error);
    // }
  },
);
