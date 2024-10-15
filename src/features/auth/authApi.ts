import EncryptedStorage from 'react-native-encrypted-storage';
import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {LOFFT_API_CLIENT_SECRET, LOFFT_API_CLIENT_ID} from '@env';
import {logout, setAuthenticated} from './authSlice';
import {clearPersister} from 'persistance/persister';
import {SignInArgs, SignUpArgs, SignInResponse, SignUpResponse} from './types';

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

          dispatch(setAuthenticated());
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
          clearPersister();
          await EncryptedStorage.removeItem('token');
          console.log('Token removed and user signed out successfully');
        } catch (error) {
          console.log('Error during sign out:', error);
        }
      },
    }),

    signUp: builder.mutation<SignUpResponse, SignUpArgs>({
      query: ({email, password}) => ({
        url: 'api/users',
        method: 'POST',
        body: {
          user: {
            email,
            password,
          },
          client_id: LOFFT_API_CLIENT_ID,
        },
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const response = await queryFulfilled;

          dispatch(setAuthenticated());
          await EncryptedStorage.setItem(
            'token',
            response.data.user.access_token,
          );
          console.log('Token stored successfully after sign up');
        } catch (error) {
          console.log('Error during sign UP:', error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {useSignInMutation, useSignOutMutation, useSignUpMutation} =
  authApi;
