import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

export const currentUser = createAsyncThunk('users/current', async () => {
  const url = 'http://localhost:3000/users/current';
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
    console.log('current user error');
  }
});
