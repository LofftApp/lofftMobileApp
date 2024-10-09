import EncryptedStorage from 'react-native-encrypted-storage';
import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {LOFFT_API_CLIENT_SECRET, LOFFT_API_CLIENT_ID} from '@env';
import {logout, setAuthenticated} from './authSlice';

type SignInArgs = {
  email: string;
  password: string;
};

type SignInResponse = {
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

export const authApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<SignInResponse, SignInArgs>({
      query: ({email, password}) => ({
        url: '/oauth/token',
        method: 'POST',
        body: {
          email,
          password,
          client_id: LOFFT_API_CLIENT_ID,
          client_secret: LOFFT_API_CLIENT_SECRET,
          grant_type: 'password',
        },
      }),
      invalidatesTags: [
        {type: 'User', id: 'PROFILE'},
        {type: 'Adverts', id: 'LIST'},
      ],
      async onQueryStarted({}, {dispatch, queryFulfilled}) {
        try {
          const response = await queryFulfilled;

          dispatch(setAuthenticated({token: response.data.access_token}));
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
          const token = await EncryptedStorage.getItem('token');

          if (!token) {
            throw new Error('No token found');
          }

          await queryFulfilled;

          dispatch(logout());
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

export const {useSignInMutation, useSignOutMutation} = authApi;
