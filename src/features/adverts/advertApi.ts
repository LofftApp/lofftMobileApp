import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {
  Advert,
  AdvertWithApplications,
  IncomingAdvert,
  IncomingAdverts,
  IncomingAdvertWithApplications,
} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import {Application} from 'reduxFeatures/applications/types';

export const advertApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getAdverts: builder.query<Advert[], void>({
      query: () => '/api/adverts',
      transformResponse: (response: IncomingAdverts) => {
        console.log('getAdverts called 🚨');
        return toCamelCaseKeys(response.adverts as unknown as Advert[]);
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({id}) => ({type: 'Adverts', id} as const)),
              {type: 'Adverts', id: 'LIST'},
            ]
          : [{type: 'Adverts', id: 'LIST'}],
    }),
    getAdvertById: builder.query<Advert, number>({
      query: id => `/api/adverts/${id}`,
      providesTags: (result, error, id) => [{type: 'Adverts', id}],
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
        const patchResult = dispatch(
          advertApi.util.updateQueryData('getAdvertById', id, draft => {
            if (draft) {
              draft.favorite = !draft.favorite;
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, id) => [
        {type: 'Adverts', id},
        {type: 'Applications', id: 'LIST'},
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
