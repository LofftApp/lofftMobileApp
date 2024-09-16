import {lofftApi} from 'features/api/lofftApi';

export const advertApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getAdverts: builder.query<void, void>({
      query: () => '/api/adverts',
    }),
  }),
  overrideExisting: false,
});

export const {useGetAdvertsQuery} = advertApi;
