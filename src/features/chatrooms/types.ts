interface Message {
  id: number;
  chatroomId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  read: boolean;
}

interface Chatroom {
  id: number;
  name: string;
  message: Message;
  userPhoto: string;
  matchScore: number;
}

interface ChatroomsState {
  chatrooms: Chatroom[];
}

export type {
  ChatroomsState,
  Chatroom,
};
