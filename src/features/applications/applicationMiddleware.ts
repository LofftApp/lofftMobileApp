import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage/lib/typescript/EncryptedStorage';
import axios from 'axios';

// const applyForAdvert = createAsyncThunk(
//     ''
// );

export const changeAdvertStatus = createAsyncThunk(
  'advert/changeAdvertStatus',
  async (id: number) => {
    const url = `http://127.0.0.1:3000/api/adverts/${id}/changeStatus`;
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
      console.log('ChangeAdvertStatus error:', error);
    }
  },
);
