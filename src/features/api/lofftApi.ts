import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from 'helpers/baseUrl';
import EncryptedStorage from 'react-native-encrypted-storage'; // Assuming you're using EncryptedStorage for token storage

export const lofftApi = createApi({
  reducerPath: 'lofftApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async headers => {
      const token = await EncryptedStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
});
