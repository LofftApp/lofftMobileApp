import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {Assets, SpecificUser, User} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';

export const userApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => 'api/users/profile',
      transformResponse: response => {
        console.log('getUser called 👾');
        console.log('response USER:', response);
        return toCamelCaseKeys(response as User);
      },
      providesTags: [{type: 'User', id: 'PROFILE'}],
    }),
    getSpecificUser: builder.query<SpecificUser, number>({
      query: id => `api/users/${id}/specific_user`,
      transformResponse: response => {
        return toCamelCaseKeys(response as SpecificUser);
      },
    }),
    completeUserAndCreateTennant: builder.mutation({
      query: ({id, userChoices}) => {
        return {
          url: `/api/users/${id}/complete_tennant_sign_up`,
          method: 'POST',
          body: userChoices,
        };
      },
    }),

    getAssets: builder.query<Assets, void>({
      query: () => '/api/assets',
      transformResponse: response => {
        console.log('get Assets called 🎨');
        return toCamelCaseKeys(response as Assets);
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useGetSpecificUserQuery,
  useCompleteUserAndCreateTennantMutation,
  useGetAssetsQuery,
} = userApi;
