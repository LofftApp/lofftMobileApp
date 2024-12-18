import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';

// Redux 🛜
import { useGetChatroomsQuery } from 'reduxFeatures/chatrooms/chatroomApi';

// Components 🧱
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import ChatCard from 'components/cards/ChatCard';

// Types 🦄
import { Chatroom } from 'reduxFeatures/chatrooms/types';

const LessorChatIndexScreen = () => {
  const {data, isLoading} = useGetChatroomsQuery();
  console.log(data);

  if(isLoading) {
    return <LoadingComponent/>;
  }

  return(
    <View style={styles.container}>
      {data.chatrooms.map((el: Chatroom) => <ChatCard name={el.name}/>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.White[100],
  },
});

export default LessorChatIndexScreen;
