interface Message {
  id: number | string;
  chatroomId?: number;
  userId?: number | undefined;
  user_id?: number | undefined;
  content?: string;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  read?: boolean;
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

type ChatRoomData = {
  id: number;
  matchScore: number;
  message?: Message | null;
  name: string;
  userPhoto?: string | null;
  advertTagLine: string;
};

type ChatCardProps = {
  chatroomData: ChatRoomData;
  isLessor: boolean;
};

interface ChatroomsState {
  chatrooms: Chatroom[];
}

interface MessagesState {
  messages: Message[];
}

export type {ChatroomsState, Chatroom, Message, MessagesState, ChatCardProps};
