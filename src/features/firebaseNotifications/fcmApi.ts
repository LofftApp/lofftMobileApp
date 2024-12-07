import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {Notifications} from './types';

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
    getNotifications: builder.query<Notifications, void>({
      query: () => '/api/notifications',
      transformResponse: response => {
        console.log('getNotifications called 📩');
        return toCamelCaseKeys(response as Notifications);
      },
      providesTags: result =>
        result
          ? [
              ...result.notifications.map(
                ({id}) => ({type: 'Notifications', id} as const),
              ),
              {type: 'Notifications', id: 'LIST'},
            ]
          : [{type: 'Notifications', id: 'LIST'}],
    }),

    markAsRead: builder.mutation<void, number[]>({
      query: ids => ({
        url: '/api/notifications/update_read_notifications',
        method: 'PATCH',
        body: {ids},
      }),
      invalidatesTags: [{type: 'Notifications', id: 'LIST'}],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterTokenMutation,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} = fcmApi;
