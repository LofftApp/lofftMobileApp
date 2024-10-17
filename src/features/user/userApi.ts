import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {IncomingSpecificUser, IncomingUser, SpecificUser, User} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';

export const userApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => 'api/users/profile',
      transformResponse: (response: IncomingUser) => {
        console.log('getUser called 👾');
        console.log('response USER:', response);
        return toCamelCaseKeys(response as unknown as User);
      },
      providesTags: [{type: 'User', id: 'PROFILE'}],
    }),
    getSpecificUser: builder.query<SpecificUser, number>({
      query: id => `api/users/${id}/specific_user`,
      transformResponse: (response: IncomingSpecificUser) => {
        return toCamelCaseKeys(response as unknown as SpecificUser);
      },
    }),
    updateUser: builder.mutation({
      query: ({id, userChoices}) => {
        return {
        url: `/api/users/${id}`,
        method: 'PATCH',
        body: userChoices,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {useGetUserQuery, useGetSpecificUserQuery, useUpdateUserMutation} = userApi;
