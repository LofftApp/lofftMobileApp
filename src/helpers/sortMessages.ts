import {Message} from 'reduxFeatures/chatrooms/types';

export const sortMessages = (inputMessages: Message[]) => {
  return inputMessages.sort((a, b) => {
    const dateA = new Date(a.createdAt || a.created_at || '');
    const dateB = new Date(b.createdAt || b.created_at || '');
    return dateB.getTime() - dateA.getTime();
  });
};
