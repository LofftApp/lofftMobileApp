import {lofftApi} from 'reduxFeatures/api/lofftApi';

export const fcmApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    registerToken: builder.mutation({
      query: token => ({
        url: '/api/notifications/register',
        method: 'POST',
        body: token,
      }),
    }),
  }),
});

export const {useRegisterTokenMutation} = fcmApi;
