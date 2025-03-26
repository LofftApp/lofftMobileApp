import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {
  Advert,
  Adverts,
  AdvertWithApplications,
  EditAdvertParams,
  EditFlatImageParams,
  EditFlatParams,
  Favorites,
  GetAdvertsParams,
} from './types';

import {Platform} from 'react-native';

import {NewUserLessorDetails} from 'reduxFeatures/registration/types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import {Application} from 'reduxFeatures/applications/types';

import {applicationApi} from 'reduxFeatures/applications/applicationApi';
import {
  initialMaxPrice,
  initialMinPrice,
} from 'components/componentData/constants';
import {ImageToUpload, SavedImage} from 'reduxFeatures/imageHandling/types';

export const advertApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getAdverts: builder.query<Adverts, GetAdvertsParams>({
      query: ({
        features = '',
        minPrice = initialMinPrice,
        maxPrice = initialMaxPrice,
      } = {}) => {
        const baseEndpoint = '/api/adverts';
        const params = new URLSearchParams();
        if (features) {
          params.append('features', features);
        }

        if (minPrice !== initialMinPrice || maxPrice !== initialMaxPrice) {
          params.append('minPrice', String(minPrice));
          params.append('maxPrice', String(maxPrice));
        }
        return params.toString()
          ? `${baseEndpoint}?${params.toString()}`
          : baseEndpoint;
      },

      transformResponse: response => {
        console.log('getAdverts called 🚨');

        return toCamelCaseKeys(response as Adverts);
      },
      providesTags: result =>
        result
          ? [
              ...result.adverts.map(({id}) => ({type: 'Adverts', id} as const)),
              {type: 'Adverts', id: 'LIST'},
            ]
          : [{type: 'Adverts', id: 'LIST'}],
    }),
    getAdvertById: builder.query<Advert, number>({
      query: id => `/api/adverts/${id}`,
      providesTags: (result, error, id) => [
        {type: 'Adverts', id},
        {type: 'Applications', id},
        {type: 'Adverts', id: 'LIST'},
        {type: 'Applications', id: 'LIST'},
      ],
      transformResponse: response => {
        console.log('getAdvertById called 🌈');
        return toCamelCaseKeys(response as Advert);
      },
    }),
    seeApplicationsByAdvertId: builder.query<AdvertWithApplications, number>({
      query: id => `/api/adverts/${id}/see_applications_by_advert_id`,
      transformResponse: response => {
        console.log('seeApplicationsByAdvertId called 🎉');

        return toCamelCaseKeys(response as AdvertWithApplications);
      },
    }),
    toggleFavorite: builder.mutation<
      {action: 'created' | 'deleted'; status: string},
      number
    >({
      query: id => ({
        url: `/api/adverts/${id}/favorites`,
        method: 'POST',
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const patchAdvertById = dispatch(
          advertApi.util.updateQueryData('getAdvertById', id, draft => {
            if (draft) {
              draft.favorite = !draft.favorite;
            }
          }),
        );

        const patchAdvertList = dispatch(
          advertApi.util.updateQueryData('getAdverts', undefined, draft => {
            draft.adverts.forEach(advert => {
              if (advert.id === id) {
                advert.favorite = !advert.favorite;
              }
            });
          }),
        );

        const patchApplicationById = dispatch(
          applicationApi.util.updateQueryData(
            'getApplicationById',
            id,
            draft => {
              if (draft && draft.advert) {
                draft.advert.favorite = !draft.advert?.favorite;
              }
            },
          ),
        );

        const patchApplicationList = dispatch(
          applicationApi.util.updateQueryData(
            'getApplications',
            undefined,
            draft => {
              draft.applications.forEach(application => {
                if (application.advert?.id === id) {
                  application.advert.favorite = !application.advert.favorite;
                }
              });
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchAdvertById.undo();
          patchAdvertList.undo();
          patchApplicationById.undo();
          patchApplicationList.undo();
        }
      },

      invalidatesTags: (result, error, id) => [
        {type: 'Adverts', id: 'LIST'},
        {type: 'Adverts', id},
        {type: 'Applications', id: 'LIST'},
        {type: 'Applications', id},
        {type: 'Favorites', id: 'LIST'},
      ],
    }),

    finalRound: builder.query<Adverts, number>({
      query: id => `/api/adverts/${id}/see_applications_by_advert_id`,
      transformResponse: response => {
        console.log('finalRound called 🚨');

        return toCamelCaseKeys(response as Adverts);
      },
    }),

    applyForFlat: builder.mutation<{credits: number; status: string}, number>({
      query: id => ({
        url: `/api/adverts/${id}/advert_applications`,
        method: 'POST',
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        try {
          await new Promise(resolve => setTimeout(resolve, 3000));

          await queryFulfilled;

          dispatch(
            advertApi.util.updateQueryData('getAdverts', undefined, draft => {
              draft.adverts.forEach(advert => {
                if (advert.id === id) {
                  advert.applied = true;
                }
              });
            }),
          );

          dispatch(
            advertApi.util.updateQueryData('getAdvertById', id, draft => {
              if (draft) {
                draft.applied = true;
              }
            }),
          );

          dispatch(
            advertApi.util.updateQueryData(
              'getFavoritesAdverts',
              undefined,
              draft => {
                draft.favorites.forEach(favorite => {
                  if (favorite.id === id) {
                    favorite.applied = true;
                  }
                });
              },
            ),
          );
        } catch (error) {
          console.error('Error in mutation:', error);
        }
      },
      invalidatesTags: [{type: 'User', id: 'PROFILE'}],
    }),

    confirmApplications: builder.mutation<
      void,
      {
        id: number;
        applicationType: string;
        applications: Partial<Application>[];
      }
    >({
      query: ({id, applicationType, applications}) => ({
        url: `/api/adverts/${id}/confirm_applicants`,
        method: 'POST',
        headers: {
          'Application-Type': applicationType,
        },
        body: applications,
      }),
      invalidatesTags: (result, error, {id}) => [
        {type: 'Adverts', id},
        {type: 'Applications', id: 'LIST'},
      ],
    }),
    completeLessorAndCreateAdvert: builder.mutation<
      void,
      {
        id: number;
        userChoices: NewUserLessorDetails;
        flatImages: SavedImage[];
        mainFlatImage: SavedImage | null;
        lessorProfileImages: SavedImage[];
        avatar: SavedImage | null;
      }
    >({
      query: ({
        id,
        userChoices,
        flatImages,
        mainFlatImage,
        lessorProfileImages,
        avatar,
      }) => {
        const formData = new FormData();
        formData.append('userChoices', JSON.stringify(userChoices));

        if (flatImages.length > 0) {
          flatImages.forEach((image, index) => {
            formData.append(`flatImages[${index}]`, {
              uri:
                Platform.OS === 'ios'
                  ? image.uri.replace('file://', '')
                  : image.uri,
              type: (image as ImageToUpload).type,
              name: `flatImage_${(image as ImageToUpload).fileName}`,
            });
          });
        }

        if (mainFlatImage) {
          formData.append('mainFlatImage', {
            uri:
              Platform.OS === 'ios'
                ? mainFlatImage.uri.replace('file://', '')
                : mainFlatImage.uri,
            type: (mainFlatImage as ImageToUpload).type,
            name: `mainFlatImage_${(mainFlatImage as ImageToUpload).fileName}`,
          });
        }

        if (lessorProfileImages.length > 0) {
          lessorProfileImages.forEach((image, index) => {
            formData.append(`lessorProfileImages[${index}]`, {
              uri:
                Platform.OS === 'ios'
                  ? image.uri.replace('file://', '')
                  : image.uri,
              type: (image as ImageToUpload).type,
              name: `lessorProfileImage_${(image as ImageToUpload).fileName}`,
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
        return {
          url: `/api/adverts/${id}/complete_lessor_sign_up`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (result, error, {id}) => [
        {type: 'Adverts', id},
        {type: 'Applications', id: 'LIST'},
        {type: 'User', id: 'PROFILE'},
      ],
    }),
    getFavoritesAdverts: builder.query<Favorites, void>({
      query: () => '/api/favorites',
      providesTags: result =>
        result
          ? [
              ...result.favorites.map(
                ({id}) => ({type: 'Favorites', id} as const),
              ),
              {type: 'Favorites', id: 'LIST'},
            ]
          : [{type: 'Favorites', id: 'LIST'}],
      transformResponse: response => {
        console.log('getFavoritesAdverts called ❤️');
        return toCamelCaseKeys(response as Favorites);
      },
    }),
    editAdvert: builder.mutation<void, EditAdvertParams>({
      query: ({advertId, actionMethod, ...rest}) => {
        return {
          url: `/api/adverts/${advertId}`,
          method: 'PATCH',
          body: {
            actionMethod,
            ...rest,
          },
        };
      },
      invalidatesTags: (result, error, {advertId}) => [
        {type: 'Adverts', id: advertId},
        {type: 'Adverts', id: 'LIST'},
        {type: 'Applications', id: 'LIST'},
        {type: 'Applications', id: advertId},
      ],
    }),
    editFlat: builder.mutation<void, EditFlatParams>({
      query: ({flatId, actionMethod, ...rest}) => {
        return {
          url: `/api/flats/${flatId}`,
          method: 'PATCH',
          body: {
            actionMethod,
            ...rest,
          },
        };
      },
      invalidatesTags: (result, error, {flatId}) => [
        {type: 'Adverts', id: flatId},
        {type: 'Adverts', id: 'LIST'},
        {type: 'Applications', id: 'LIST'},
        {type: 'Applications', id: flatId},
      ],
    }),

    editFlatImage: builder.mutation<void, EditFlatImageParams>({
      query: ({
        flatId,
        actionMethod,
        data: {existingImages, newImages, deletedImages, mainImage},
      }) => {
        const formData = new FormData();
        formData.append('actionMethod', actionMethod);
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
          url: `/api/flats/${flatId}`,
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: (result, error, {flatId}) => [
        {type: 'Adverts', id: flatId},
        {type: 'Adverts', id: 'LIST'},
        {type: 'Applications', id: 'LIST'},
        {type: 'Applications', id: flatId},
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdvertsQuery,
  useGetAdvertByIdQuery,
  useFinalRoundQuery,
  useSeeApplicationsByAdvertIdQuery,
  useToggleFavoriteMutation,
  useApplyForFlatMutation,
  useConfirmApplicationsMutation,
  useCompleteLessorAndCreateAdvertMutation,
  useGetFavoritesAdvertsQuery,
  useEditAdvertMutation,
  useEditFlatMutation,
  useEditFlatImageMutation,
} = advertApi;
