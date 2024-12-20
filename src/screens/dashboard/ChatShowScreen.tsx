import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components 🧱
import BackButton from 'components/buttons/BackButton';

// Types 🦄
import { ChatShowProp } from './types';
import { useGetChatroombyIdQuery } from 'reduxFeatures/chatrooms/chatroomApi';
import { Message } from 'reduxFeatures/chatrooms/types';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

const ChatShowScreen = ({route, currentUser, isLessor}: ChatShowProp) => {
  const chatroomId = route.params.chatroomId;
  const {data, isLoading, refetch} = useGetChatroombyIdQuery(chatroomId);
  const navigation = useNavigation();

  console.log(data);

  if(isLoading) {
    return <LoadingComponent />;
  }

  return(
    <View>
      <BackButton title="Chat" onPress={() => navigation.goBack()} />
      <Text>Hello from Chatroom {chatroomId} </Text>
      {data.messages.map((message:Message) => <Text>
        {message.content} {message.userId}
      </Text>)}
    </View>
  );
};

export default ChatShowScreen;
