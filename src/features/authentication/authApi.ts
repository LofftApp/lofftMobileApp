import EncryptedStorage from 'react-native-encrypted-storage';
import {lofftApi} from 'reduxFeatures/api/lofftApi';

export const authApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    checkToken: builder.query<boolean, void>({
      query: () => 'authentication/checkToken',
      transformResponse: async (response: boolean) => {
        console.log('checkToken called 🎃');
        console.log('response :', response);
        const token = await EncryptedStorage.getItem('token');
        console.log('token:', token, !!token);
        return !!token;
      },
    }),

    // signIn: builder.mutation<void, {email: string; password: string}
  }),
  overrideExisting: false,
});

export const {useCheckTokenQuery} = authApi;
