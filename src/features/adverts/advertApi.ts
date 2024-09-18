import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {Advert, IncomingAdvert, IncomingAdverts} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';

export const advertApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getAdverts: builder.query<Advert[], void>({
      query: () => '/api/adverts',
      transformResponse: (response: IncomingAdverts) =>
        toCamelCaseKeys(response.adverts as unknown as Advert[]),
    }),
    getAdvertById: builder.query<Advert, number>({
      query: id => `/api/adverts/${id}`,
      transformResponse: (response: IncomingAdvert) =>
        toCamelCaseKeys(response as unknown as Advert),
    }),
  }),
  overrideExisting: false,
});

export const {useGetAdvertsQuery, useGetAdvertByIdQuery} = advertApi;
