import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {
  Advert,
  AdvertWithApplications,
  AdvertWithApplicationsAndSelected,
  ApplicantWithSelected,
  IncomingAdvert,
  IncomingAdverts,
  IncomingAdvertWithApplications,
} from './types';
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
    seeApplicationsByAdvertId: builder.query<AdvertWithApplications, number>({
      query: id => `/api/adverts/${id}/see_applications_by_advert_id`,
      transformResponse: (response: IncomingAdvertWithApplications) => {
        const transformedResponse = toCamelCaseKeys(
          response as unknown as AdvertWithApplications,
        );

        return transformedResponse;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdvertsQuery,
  useGetAdvertByIdQuery,
  useSeeApplicationsByAdvertIdQuery,
} = advertApi;
