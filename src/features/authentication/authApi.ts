import EncryptedStorage from 'react-native-encrypted-storage';
import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {LOFFT_API_CLIENT_SECRET, LOFFT_API_CLIENT_ID} from '@env';

type SignInArgs = {
  email: string;
  password: string;
};
type SignInBody = SignInArgs & {
  client_id: string;
  client_secret: string;
  grant_type: string;
};

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

    signIn: builder.mutation<void, SignInArgs>({
      query: ({email, password}) => ({
        url: '/oauth/token',
        method: 'POST',
        body: {
          email,
          password,
          client_id: LOFFT_API_CLIENT_ID,
          client_secret: LOFFT_API_CLIENT_SECRET,
          grant_type: 'password',
        } as SignInBody,
      }),
      invalidatesTags: [{type: 'User', id: 'PROFILE'}],
      async onQueryStarted({email, password}, {dispatch, queryFulfilled}) {
        try {
          // Wait for the query to fulfill
          const response = await queryFulfilled;

          // Store the access token in EncryptedStorage
          await EncryptedStorage.setItem('token', response.data.access_token);

          console.log('Token stored successfully');
        } catch (error) {
          console.log('Error storing token:', error);
        }
      },
    }),
    signOut: builder.mutation<void, void>({
      query: token => ({
        url: '/oauth/revoke',
        method: 'POST',
        body: {
          token,
          client_id: LOFFT_API_CLIENT_ID,
          client_secret: LOFFT_API_CLIENT_SECRET,
        },
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          // Retrieve the token from EncryptedStorage
          const token = await EncryptedStorage.getItem('token');

          if (!token) {
            throw new Error('No token found');
          }

          // Perform the query with the token
          await queryFulfilled;

          // Remove the token after successful sign-out
          await EncryptedStorage.removeItem('token');
          console.log('Token removed and user signed out successfully');
        } catch (error) {
          console.log('Error during sign out:', error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {useCheckTokenQuery, useSignInMutation, useSignOutMutation} =
  authApi;
