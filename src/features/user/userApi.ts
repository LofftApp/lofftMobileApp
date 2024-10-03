import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {UserProfile} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';

export const userApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getUserProfile: builder.query<UserProfile, number>({
      query: id => `api/users/${id}/specific_user`,
      transformResponse: (response: UserProfile) => {
        return toCamelCaseKeys(response as unknown as UserProfile);
      },
    }),
  }),
  overrideExisting: false,
});

export const {useGetUserProfileQuery} = userApi;
