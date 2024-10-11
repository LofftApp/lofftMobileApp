import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {
  Advert,
  AdvertsAndFeatures,
  AdvertWithApplications,
  IncomingAdvert,
  IncomingAdvertAndFeatures,
  IncomingAdvertWithApplications,
} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import {Application} from 'reduxFeatures/applications/types';
import {
  initialMaxPrice,
  initialMinPrice,
} from 'components/modals/SearchFilterModal';
import {applicationApi} from 'reduxFeatures/applications/applicationApi';

export const advertApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getAdverts: builder.query<
      AdvertsAndFeatures,
      | {
          features?: string;
          minPrice?: string | number;
          maxPrice?: string | number;
        }
      | undefined
    >({
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

      transformResponse: (response: IncomingAdvertAndFeatures) => {
        console.log('getAdverts called 🚨');
        return toCamelCaseKeys(response as unknown as AdvertsAndFeatures);
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
        {type: 'Applications', id: 'LIST'},
        {type: 'Adverts', id: 'LIST'},
      ],
      transformResponse: (response: IncomingAdvert) => {
        console.log('getAdvertById called 🌈');
        return toCamelCaseKeys(response as unknown as Advert);
      },
    }),
    seeApplicationsByAdvertId: builder.query<AdvertWithApplications, number>({
      query: id => `/api/adverts/${id}/see_applications_by_advert_id`,
      transformResponse: (response: IncomingAdvertWithApplications) =>
        toCamelCaseKeys(response as unknown as AdvertWithApplications),
    }),
    toggleFavorite: builder.mutation<
      {action: 'created' | 'deleted'; status: string},
      number
    >({
      query: id => ({
        url: `/api/adverts/${id}/favorite`,
        method: 'POST',
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        // Optimistically update the advert by ID's favorite status
        const patchAdvertById = dispatch(
          advertApi.util.updateQueryData('getAdvertById', id, draft => {
            if (draft) {
              draft.favorite = !draft.favorite;
            }
          }),
        );

        // Optimistically update the advert list's favorite status
        const patchAdvertList = dispatch(
          advertApi.util.updateQueryData('getAdverts', undefined, draft => {
            draft.adverts.forEach(advert => {
              if (advert.id === id) {
                advert.favorite = !advert.favorite;
              }
            });
          }),
        );

        // Optimistically update the application by ID's favorite status
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

        // Optimistically update the application list's favorite status
        const patchApplicationList = dispatch(
          applicationApi.util.updateQueryData(
            'getApplications',
            undefined,
            draft => {
              draft.forEach(application => {
                if (application.advert?.id === id) {
                  application.advert.favorite = !application.advert.favorite;
                }
              });
            },
          ),
        );

        try {
          // Wait for the API response
          await queryFulfilled;
        } catch {
          // If the request fails, undo all optimistic updates
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
      ],
    }),
    applyForFlat: builder.mutation<{credits: number; status: string}, number>({
      query: id => ({
        url: `/api/adverts/${id}/apply`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [
        {type: 'Adverts', id},
        {type: 'Applications', id: 'LIST'},
        {type: 'User', id: 'PROFILE'},
      ],
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
  }),
  overrideExisting: false,
});

export const {
  useGetAdvertsQuery,
  useGetAdvertByIdQuery,
  useSeeApplicationsByAdvertIdQuery,
  useToggleFavoriteMutation,
  useApplyForFlatMutation,
  useConfirmApplicationsMutation,
} = advertApi;
