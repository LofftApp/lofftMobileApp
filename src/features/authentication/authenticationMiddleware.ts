import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

export const checkToken = createAsyncThunk(
  'authentication/checkToken',
  async () => {
    try {
      const token = await EncryptedStorage.getItem('token');
      return token ? true : false;
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
      const response = await axios.post(url, {user: {email, password}});
      await EncryptedStorage.setItem('token', response.data.user.token);
      return response.data.user;
    } catch (error) {
      console.log('signUp error:', error);
    }
  },
);

export const signIn = createAsyncThunk(
  'authentication/signIn',
  async ({email, password}: {email: string; password: string}) => {
    // development url
    const url = 'http://localhost:3000/api/users/login';
    try {
      const response = await axios.post(url, {user: {email, password}});
      await EncryptedStorage.setItem('token', response.data.user.token);
      return response.data.user;
    } catch (error) {
      console.log('signIn error:', error);
    }
  },
);

export const signOut = createAsyncThunk('authentication/signOut', async () => {
  // development url
  const url = 'http://localhost:3000/api/users/sign_out';
  try {
    const response = await axios.delete(url);
    await EncryptedStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.log('signOut error:', error);
  }
});