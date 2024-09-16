import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from 'helpers/baseUrl';
import EncryptedStorage from 'react-native-encrypted-storage'; // Assuming you're using EncryptedStorage for token storage

export const lofftApi = createApi({
  reducerPath: 'lofftApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async (headers) => {
      // Retrieve the token from storage or any other source
      const token = await EncryptedStorage.getItem('token');

      // If we have a token, set it in the headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      // You can also set other headers here if needed
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: () => ({}),
});
