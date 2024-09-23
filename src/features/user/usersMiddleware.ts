import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

export const getProfile = createAsyncThunk('users/profile', async () => {
  const url = 'http://localhost:3000/api/users/profile';
  try {
    const token = await EncryptedStorage.getItem('token');
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('current user response:', response.data);
    return response.data;
  } catch (error) {
    console.log('current user error', error);
    return null;
  }
});

// export const getSpecificUserProfile = createAsyncThunk
export const getSpecificUserProfile = async (id: number) => {
  console.log('sending userId:', id);
  const url = `http://127.0.0.1:3000/api/users/${id}/specific_user`;
  const token = await EncryptedStorage.getItem('token');
  try {
    const token = await EncryptedStorage.getItem('token');
    const response = await axios.get(url, {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
    return response;
  } catch (error) {
    console.log('getSpecificUserProfile error:', error);
  }
};
