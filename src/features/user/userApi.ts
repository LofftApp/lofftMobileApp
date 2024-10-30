import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {SpecificUser, User} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import { Platform } from 'react-native';
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
      {id: number; userChoices: NewUserLessorDetails | NewUserTenantDetails; photos?: File[]}
    >({
      query: ({id, userChoices, photos}) => {
      const formData = new FormData();
      formData.append("userChoices", JSON.stringify(userChoices));
      if (photos) {
       photos.forEach((uri, index) => {
        formData.append(`photos[${index}]`, {
        uri: Platform.OS === 'ios' ? uri.toString().replace('file://', '') : uri, // iOS sometimes needs 'file://' removed
        name: `photo_${index}.jpg`,
        type: 'image/jpeg', // Adjust based on actual image format if needed
    });
  });
    }
      return {
        url: `/api/users/${id}/complete_tenant_sign_up`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
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
