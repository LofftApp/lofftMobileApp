import {lofftApi} from 'reduxFeatures/api/lofftApi';

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

  }),
  overrideExisting: false,
});

export const {useRegisterTokenMutation} = fcmApi;
