import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from 'helpers/baseUrl';
import {clearPersister} from 'persistance/persister';
import EncryptedStorage from 'react-native-encrypted-storage';
import {RootState} from 'reduxCore/store';
import {logout, setAuthMessage} from 'reduxFeatures/auth/authSlice';

export const lofftApi = createApi({
  reducerPath: 'lofftApi',
  baseQuery: async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: baseUrl,
      prepareHeaders: async headers => {
        try {
          const token = await EncryptedStorage.getItem('token');
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          headers.set('Content-Type', 'application/json');
        } catch (error) {
          console.error('Error retrieving token:', error);
        }
        return headers;
      },
    });

    const result = await baseQuery(args, api, extraOptions);
    const state = api.getState() as RootState;

    if (result.error) {
      if (result.error.status === 401 && state.auth.isAuthenticated) {
        api.dispatch(logout());
        api.dispatch(setAuthMessage('Session expired. Please log in again.'));
        clearPersister();
      }
      console.error('API error:', result.error);
    }

    return result;
  },
  tagTypes: ['Adverts', 'Applications', 'User'],
  endpoints: () => ({}),
});
