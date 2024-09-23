import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from 'helpers/baseUrl';
import EncryptedStorage from 'react-native-encrypted-storage';

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

    if (result.error) {
      console.error('API error:', result.error);
    }

    return result;
  },
  tagTypes: ['Adverts', 'Applications'],
  endpoints: () => ({}),
});
