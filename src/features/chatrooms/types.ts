interface Message {
  id: number;
  chatroomId: number;
  userId: number;
  user_id?: number;
  content: string;
  createdAt: string;
  created_at?: string;
  updatedAt: string;
  read: boolean;
  errorId?: string;
}

interface Chatroom {
  id: number;
  name: string;
  message: Message | null;
  userPhoto?: string;
  matchScore: number;
  advertTagLine: string;
}

interface ChatroomsState {
  chatrooms: Chatroom[];
}

interface MessagesState {
  messages: Message[];
}

export type {ChatroomsState, Chatroom, Message, MessagesState};
