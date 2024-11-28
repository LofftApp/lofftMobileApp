import { lofftApi } from 'reduxFeatures/api/lofftApi';

export const fcmApi = lofftApi.injectEndpoints({
  endpoints: (builder) => ({
    registerToken: builder.mutation({
      query: (token) => {
        const payload = JSON.stringify({ token }); // Prepare the payload
        console.log('FCM Token Payload:', payload); // Log the payload
        return {
          url: '/api/notifications/register',
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'application/json', // Ensure proper headers
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterTokenMutation } = fcmApi;
