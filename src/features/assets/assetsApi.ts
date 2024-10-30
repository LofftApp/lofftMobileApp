import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import {lofftApi} from 'reduxFeatures/api/lofftApi';
import { Assets } from './types';

export const assetsApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getAssets: builder.query<Assets, void>({
      query: () => '/api/assets',
      transformResponse: response => {
        return toCamelCaseKeys(response as Assets);
      },
    }),
  }),
  overrideExisting: false,
});

export const {useGetAssetsQuery} = assetsApi;
