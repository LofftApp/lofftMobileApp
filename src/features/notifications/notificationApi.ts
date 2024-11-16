import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';

export const notificationApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query({
      query: () => '/api/notifications',
      transformResponse: response => {
          return toCamelCaseKeys(response );
        },
    }),
  }),
  overrideExisting: false,
});

export const { useGetNotificationsQuery } = notificationApi;
