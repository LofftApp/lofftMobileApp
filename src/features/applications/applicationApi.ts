import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {
  AdvertWithApplications,
  Application,
  IncomingAdvertWithApplications,
  IncomingApplications,
} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';

export const applicationApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getApplications: builder.query<Application[], void>({
      query: () => '/api/advert_applications',
      transformResponse: (response: IncomingApplications) =>
        toCamelCaseKeys(response.applications as unknown as Application[]),
      providesTags: result =>
        result
          ? [
              ...result.map(({id}) => ({type: 'Applications', id} as const)),
              {type: 'Applications', id: 'LIST'},
            ]
          : [{type: 'Applications', id: 'LIST'}],
    }),
    getApplicationById: builder.query<AdvertWithApplications, number>({
      query: id => `/api/advert_applications/${id}`,
      transformResponse: (response: IncomingAdvertWithApplications) =>
        toCamelCaseKeys(response as unknown as AdvertWithApplications),
      providesTags: (result, error, id) => [{type: 'Applications', id}],
    }),
  }),
  overrideExisting: false,
});

export const {useGetApplicationsQuery, useGetApplicationByIdQuery} =
  applicationApi;
