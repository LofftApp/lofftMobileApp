import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {IncomingSpecificUser, SpecificUser} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';

export const userApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getSpecificUser: builder.query<SpecificUser, number>({
      query: id => `api/users/${id}/specific_user`,
      transformResponse: (response: IncomingSpecificUser) => {
        return toCamelCaseKeys(response as unknown as SpecificUser);
      },
    }),
  }),
  overrideExisting: false,
});

export const {useGetSpecificUserQuery} = userApi;
