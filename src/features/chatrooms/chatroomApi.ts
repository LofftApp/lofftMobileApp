import { toCamelCaseKeys } from 'helpers/toCamelCaseKeys';
import {lofftApi} from 'reduxFeatures/api/lofftApi';
import { ChatroomsState, MessagesState } from './types';

export const chatroomsApi = lofftApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatrooms: builder.query<any, void>({
      query: () => '/api/chatrooms',
      transformResponse: (response) => {
        console.log('getChatrooms called 🎨');
        return toCamelCaseKeys(response as ChatroomsState);
      },
    }),
    getChatroombyId: builder.query<any, number>({
      query: id => `/api/chatrooms/${id}`,
      transformResponse: (response) => {
        console.log('getChatroombyId called 🌈');
        return toCamelCaseKeys(response as MessagesState);
      },
    }),
    createMessage: builder.mutation<any, { id: number, content: string }>({
      query: ({ id, content }) => ({
        url: `/api/chatrooms/${id}/messages`,
        method: 'POST',
        body: { content },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetChatroomsQuery,
  useGetChatroombyIdQuery,
  useCreateMessageMutation,
} = chatroomsApi;
