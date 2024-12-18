interface Message {
  id: number;
  chatroom_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  read: boolean;
}

interface Chatroom {
  id: number;
  message: Message
}

interface ChatroomsState {
  chatrooms: Chatroom[];
}

export type {
  ChatroomsState,
};
