import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import {LOFFT_API_CLIENT_SECRET, LOFFT_API_CLIENT_ID} from '@env';
// @ts-ignore
import {clearPersister} from 'persistance/persister';
import axios from 'axios';

export const checkToken = createAsyncThunk(
  'authentication/checkToken',
  async () => {
    try {
      const token = await EncryptedStorage.getItem('token');
      return !!token;
    } catch (error) {
      console.log('checkToken error:', error);
    }
  },
);

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
      await EncryptedStorage.setItem('token', response.headers.authorization);
      return;
    } catch (error: any) {
      console.log('signUp error:', error.code);
    }
  },
);

export const signIn = createAsyncThunk(
  'authentication/signIn',
  async ({email, password}: {email: string; password: string}) => {
    console.log('signIn called 👽');
    // development url
    const url = 'http://localhost:3000/oauth/token';
    console.log('email', email, 'password', password);
    try {
      const response = await axios.post(url, {
        email,
        password,
        client_id: LOFFT_API_CLIENT_ID,
        client_secret: LOFFT_API_CLIENT_SECRET,
        grant_type: 'password',
      });
      await EncryptedStorage.setItem('token', response.data.access_token);
      return;
    } catch (error) {
      console.log('signIn error:', error);
    }
  },
);

export const signOut = createAsyncThunk('authentication/signOut', async () => {
  // development url
  const url = 'http://localhost:3000/oauth/revoke';
  try {
    const token = await EncryptedStorage.getItem('token');
    await axios.post(url, {
      token,
      client_id: LOFFT_API_CLIENT_ID,
      client_secret: LOFFT_API_CLIENT_SECRET,
    });
    await EncryptedStorage.removeItem('token');
    clearPersister();
    return true;
  } catch (error) {
    console.log('signOut error:', error);
  }
});
