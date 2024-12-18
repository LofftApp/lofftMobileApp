import { toCamelCaseKeys } from 'helpers/toCamelCaseKeys';
import {lofftApi} from 'reduxFeatures/api/lofftApi';

export const chatroomsApi = lofftApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatrooms: builder.query<any, void>({
      query: () => '/api/chatrooms',
      transformResponse: (response) => {
        console.log('getChatrooms called 🎨');
        console.log(response)
        return toCamelCaseKeys(response as any);
      },
    }),
  }),
  overrideExisting: false,
});
