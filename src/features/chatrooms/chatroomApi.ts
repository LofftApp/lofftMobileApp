import { toCamelCaseKeys } from 'helpers/toCamelCaseKeys';
import {lofftApi} from 'reduxFeatures/api/lofftApi';
import { ChatroomsState } from './types';

export const chatroomsApi = lofftApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatrooms: builder.query<any, void>({
      query: () => '/api/chatrooms',
      transformResponse: (response) => {
        console.log('getChatrooms called 🎨');
        return toCamelCaseKeys(response as ChatroomsState);
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetChatroomsQuery,
} = chatroomsApi;
