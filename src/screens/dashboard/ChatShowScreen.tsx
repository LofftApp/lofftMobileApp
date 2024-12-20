import React from 'react';
import { View, Text } from 'react-native';
import { ChatShowProp } from './types';

const ChatShowScreen = ({route}: ChatShowProp) => {
  const chatroomId = route.params.chatroomId;
  return(
    <View>
      <Text>Hello from Chatroom {chatroomId} </Text>
    </View>
  );
};

export default ChatShowScreen;
