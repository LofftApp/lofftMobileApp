import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {
  EditProfileActions,
  EditProfileParams,
  SpecificUser,
  User,
  UserType,
} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import {NewUserTenantDetails} from 'reduxFeatures/registration/types';

import {Platform} from 'react-native';
import {NewImage} from 'reduxFeatures/imageHandling/types';

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
        photos?: NewImage[];
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
              type: el.type,
              name: `photo_${index}.jpg`,
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
    editUserProfile: builder.mutation<
      void,
      EditProfileParams<UserType.LESSOR | UserType.TENANT>
    >({
      query: ({userId, actionMethod, userType, ...rest}) => {
        if (actionMethod === EditProfileActions.images) {
          const formData = new FormData();

          formData.append('actionMethod', actionMethod);
          formData.append('data', JSON.stringify(rest.data));
          formData.append('userType', userType);
          return {
            url: `/api/users/${userId}`,
            method: 'PATCH',
            body: formData,
          };
        }
        return {
          url: `/api/users/${userId}`,
          method: 'PATCH',
          body: {
            actionMethod,
            userType,
            ...rest,
          },
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
  useEditUserProfileMutation,
} = userApi;
