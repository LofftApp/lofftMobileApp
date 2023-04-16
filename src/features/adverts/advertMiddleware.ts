import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import {lofftRequest} from '@Api/apiRequest';
import axios from 'axios';

export const fetchAdverts = createAsyncThunk(
  'advert/fetchAdverts',
  async () => {
    // development url
    const url = 'http://localhost:3000/adverts';
    try {
      const token = await EncryptedStorage.getItem('token');
      const response = await axios.get(url, {
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('fetchAdverts error:', error);
    }
  },
);

export const toggleFavorite = createAsyncThunk(
  'advert/toggleFavorite',
  async (id: number) => {
    const url = `http://localhost:3000/adverts/${id}/favorite`;
    try {
      const token = await EncryptedStorage.getItem('token');
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return {data: response.data, id};
    } catch (error) {
      console.log('toggleFavorite error:', error);
    }
    return id;
  },
);

export const fetchLessorAdverts = createAsyncThunk(
  'advert/fetchLessorAdverts',
  async () => {
    // development url
    const url = 'http://localhost:3000/adverts/lessor';
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
      console.log('fetch Adverts error:', error);
    }
  },
);
