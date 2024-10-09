import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import {LOFFT_API_CLIENT_ID} from '@env';
// @ts-ignore
import axios from 'axios';

export const signUp = createAsyncThunk(
  'authentication/signUp',
  async ({email, password}: {email: string; password: string}) => {
    // development url
    const url = 'http://localhost:3000/api/users';
    try {
      const response = await axios.post(url, {
        user: {
          email,
          password,
        },
        client_id: LOFFT_API_CLIENT_ID,
      });
      // await EncryptedStorage.setItem('token', response.headers.authorization);
      await EncryptedStorage.setItem('token', response.data.user.token);
      return;
    } catch (error: any) {
      console.log('signUp error:', error.code);
    }
  },
);
