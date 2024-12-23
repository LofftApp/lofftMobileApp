import { toCamelCaseKeys } from 'helpers/toCamelCaseKeys';
import {lofftApi} from 'reduxFeatures/api/lofftApi';
import { ChatroomsState, MessagesState } from './types';

export const chatroomsApi = lofftApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatrooms: builder.query<ChatroomsState, void>({
      query: () => '/api/chatrooms',
      transformResponse: (response) => {
        console.log('getChatrooms called 🎨');
        return toCamelCaseKeys(response as ChatroomsState);
      },
       providesTags: result =>
        result
          ? [
              ...result.chatrooms.map(
                ({id}) => ({type: 'Chat', id} as const),
              ),
              {type: 'Chat', id: 'LIST'},
            ]
          : [{type: 'Chat', id: 'LIST'}],
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
    readAllMessages: builder.mutation<any, number>({
      query: (id) => ({
        url: `/api/chatrooms/${id}/all_messages_read`,
        method: 'PATCH',
      }),
      invalidatesTags: [{type: 'Chat', id: 'LIST'}],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetChatroomsQuery,
  useGetChatroombyIdQuery,
  useCreateMessageMutation,
  useReadAllMessagesMutation,
} = chatroomsApi;
