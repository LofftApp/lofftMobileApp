import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import {lofftRequest} from '@Api/apiRequest';
import axios from 'axios';

export const fetchAdverts = createAsyncThunk(
  'advert/fetchAdverts',
  async () => {
    // development url
    const url = 'http://localhost:3000/api/adverts';
    try {
      const token = await EncryptedStorage.getItem('token');
      const response = await axios.get(url, {
        headers: {
          ContentType: 'application/json',
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log('fetchFlats error:', error);
    }
  },
);
