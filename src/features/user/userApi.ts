import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {SpecificUser, User} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import {
  NewUserTenantDetails,
  ImageFile,
} from 'reduxFeatures/registration/types';

import {Platform} from 'react-native';

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
        console.log('response specific user', response);
        return toCamelCaseKeys(response as SpecificUser);
      },
    }),
    completeUserAndCreateTenant: builder.mutation<
      void,
      {
        id: number;
        userChoices: NewUserTenantDetails;
        photos?: ImageFile[];
      }
    >({
      query: ({id, userChoices, photos}) => {
        const formData = new FormData();
        formData.append('userChoices', JSON.stringify(userChoices));
        if (photos) {
          photos.forEach((el, index) => {
            formData.append(`photos[${index}]`, {
              uri:
                Platform.OS === 'ios' ? el.uri.replace('file://', '') : el.uri,
              name: `photo_${index}.jpg`,
              type: el.type,
            });
          });
        }
        return {
          url: `/api/users/${id}/complete_tenant_sign_up`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{type: 'User', id: 'PROFILE'}],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useGetSpecificUserQuery,
  useCompleteUserAndCreateTenantMutation,
} = userApi;
