import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {
  EditProfileImageParams,
  EditProfileParams,
  SpecificUser,
  User,
  UserType,
} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import {NewUserTenantDetails} from 'reduxFeatures/registration/types';

import {Platform} from 'react-native';
import {ImageToUpload, SavedImage} from 'reduxFeatures/imageHandling/types';

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
        photos: SavedImage[];
        avatar: SavedImage | null;
      }
    >({
      query: ({id, userChoices, photos, avatar}) => {
        const formData = new FormData();
        formData.append('userChoices', JSON.stringify(userChoices));

        if (photos.length > 0) {
          photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, {
              uri:
                Platform.OS === 'ios'
                  ? photo.uri.replace('file://', '')
                  : photo.uri,
              type: (photo as ImageToUpload).type,
              name: `photo_${(photo as ImageToUpload).fileName}`,
            });
          });
        }

        if (avatar) {
          formData.append('avatar', {
            uri:
              Platform.OS === 'ios'
                ? avatar.uri.replace('file://', '')
                : avatar.uri,
            type: (avatar as ImageToUpload).type,
            name: `avatar_${(avatar as ImageToUpload).fileName}`,
          });
        }

        console.log('formData in tenant', formData);
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

    editProfileImage: builder.mutation<
      void,
      EditProfileImageParams<UserType.LESSOR | UserType.TENANT>
    >({
      query: ({
        userId,
        actionMethod,
        userType,
        data: {existingImages, newImages, deletedImages, mainImage},
      }) => {
        const formData = new FormData();
        formData.append('actionMethod', actionMethod);
        formData.append('userType', userType);
        formData.append('existingImages', JSON.stringify(existingImages));
        formData.append('deletedImages', JSON.stringify(deletedImages));

        if (newImages.length > 0) {
          newImages.forEach((image, index) => {
            formData.append(`newImages[${index}]`, {
              uri:
                Platform.OS === 'ios'
                  ? image.uri.replace('file://', '')
                  : image.uri,
              type: image.type,
              name: `newImage_${image.fileName}`,
            });
          });
        }

        if (mainImage) {
          if ('blobId' in mainImage) {
            formData.append('mainImage', JSON.stringify(mainImage));
          } else {
            formData.append('mainImage', {
              uri:
                Platform.OS === 'ios'
                  ? mainImage.uri.replace('file://', '')
                  : mainImage.uri,
              type: mainImage.type,
              name: `mainImage_${mainImage.fileName}`,
            });
          }
        }
        return {
          url: `/api/users/${userId}`,
          method: 'PATCH',
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
  useEditUserProfileMutation,
  useEditProfileImageMutation,
} = userApi;
