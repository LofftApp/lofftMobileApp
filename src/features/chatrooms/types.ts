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
  message: Message | null;
  userPhoto: string | null;
  matchScore: number;
  advertTagLine: string;
}

interface ChatroomsState {
  chatrooms: Chatroom[];
}

interface MessagesState {
  messages: Message[]
}

export type {
  ChatroomsState,
  Chatroom,
  MessagesState,
};
