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
        url: 'authentication/signIn',
        method: 'POST',
        body: {
          email,
          password,
          client_id: LOFFT_API_CLIENT_ID,
          client_secret: 'LOFFT_API_CLIENT_SECRET',
          grant_type: 'password',
        } as SignInBody,
      }),
      invalidatesTags: [{type: 'User', id: 'PROFILE'}],
    }),
  }),
  overrideExisting: false,
});

export const {useCheckTokenQuery} = authApi;
