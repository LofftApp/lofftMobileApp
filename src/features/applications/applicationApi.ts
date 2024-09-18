import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {Application, IncomingApplication, IncomingApplications} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';

export const applicationApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getApplications: builder.query<Application[], void>({
      query: () => '/api/advert_applications',
      transformResponse: (response: IncomingApplications) =>
        toCamelCaseKeys(response.applications as unknown as Application[]),
    }),
    getApplicationById: builder.query<Application, number>({
      query: id => `/api/advert_applications/${id}`,
      transformResponse: (response: IncomingApplication) =>
        toCamelCaseKeys(response as unknown as Application),
    }),
  }),
  overrideExisting: false,
});

export const {useGetApplicationsQuery, useGetApplicationByIdQuery} =
  applicationApi;
