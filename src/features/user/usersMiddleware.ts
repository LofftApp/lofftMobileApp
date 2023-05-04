import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

export const getProfile = createAsyncThunk('users/profile', async () => {
  const url = 'http://localhost:3000/api/users/profile';
  try {
    const token = await EncryptedStorage.getItem('token');
    console.log('current user token', token);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('current user error', error);
    return null;
  }
});
