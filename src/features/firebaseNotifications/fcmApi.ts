import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {LessorNotification} from './types';

export const fcmApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    registerToken: builder.mutation<{message: string}, string>({
      query: token => {
        console.log('registerToken called 💍');
        return {
          url: '/api/notifications/register',
          method: 'POST',
          body: {token},
        };
      },
    }),
    getNotifications: builder.query<LessorNotification[], void>({
      query: () => '/api/notifications',
      transformResponse: response => {
        console.log('getNotifications called 📩');
        return toCamelCaseKeys(response as LessorNotification[]);
      },
    }),
  }),
  overrideExisting: false,
});

export const {useRegisterTokenMutation, useGetNotificationsQuery} = fcmApi;
