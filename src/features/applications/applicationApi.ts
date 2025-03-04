import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {Application, Applications} from './types';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';

export const applicationApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getApplications: builder.query<Applications, void>({
      query: () => '/api/advert_applications',
      transformResponse: response => {
        console.log('getApplications called 🌎');
        return toCamelCaseKeys(response) as Applications;
      },
      providesTags: result =>
        result?.applications
          ? [
              ...result.applications.map(
                ({id}) => ({type: 'Applications', id} as const),
              ),
              {type: 'Applications', id: 'LIST'},
              {type: 'Adverts', id: 'LIST'},
            ]
          : [
              {type: 'Applications', id: 'LIST'},
              {type: 'Adverts', id: 'LIST'},
            ],
    }),
    getApplicationById: builder.query<Application, number>({
      query: id => `/api/advert_applications/${id}`,
      transformResponse: response => {
        console.log('getApplicationById called 🌺');
        return toCamelCaseKeys(response as Application);
      },
      providesTags: (result, error, id) => [
        {type: 'Applications', id},
        {type: 'Adverts', id},
        {type: 'Applications', id: 'LIST'},
        {type: 'Adverts', id: 'LIST'},
      ],
    }),
  }),
  overrideExisting: false,
});

export const {useGetApplicationsQuery, useGetApplicationByIdQuery} =
  applicationApi;
