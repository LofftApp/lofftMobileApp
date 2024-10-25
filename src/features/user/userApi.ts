import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {SpecificUser, User} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import {
  Assets,
  NewUserLessorDetails,
  NewUserTenantDetails,
} from 'reduxFeatures/registration/types';

export const userApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => 'api/users/profile',
      transformResponse: response => {
        console.log('getUser called 👾');
        return toCamelCaseKeys(response as User);
      },
      providesTags: [{type: 'User', id: 'PROFILE'}],
    }),
    getSpecificUser: builder.query<SpecificUser, number>({
      query: id => `api/users/${id}/specific_user`,
      transformResponse: response => {
        console.log('specific user called 🎉');
        return toCamelCaseKeys(response as SpecificUser);
      },
    }),
    completeUserAndCreateTenant: builder.mutation<
      void,
      {id: number; userChoices: NewUserLessorDetails | NewUserTenantDetails}
    >({
      query: ({id, userChoices}) => {
        return {

          url: `/api/users/${id}/complete_tenant_sign_up`,
          method: 'POST',
          body: userChoices,

        };
      },
      invalidatesTags: [{type: 'User', id: 'PROFILE'}],
    }),

    getAssets: builder.query<Assets, void>({
      query: () => '/api/assets',
      transformResponse: response => {
        return toCamelCaseKeys(response as Assets);
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useGetSpecificUserQuery,
  useCompleteUserAndCreateTenantMutation,
  useGetAssetsQuery,
} = userApi;
