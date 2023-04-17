import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

export const getProfile = createAsyncThunk('users/profile', async () => {
  const url = 'http://localhost:3000/users/profile';
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
    console.log('current user error');
  }
});
