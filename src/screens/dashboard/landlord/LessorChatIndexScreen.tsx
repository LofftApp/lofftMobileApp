import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';

// Redux 🛜
import { useGetChatroomsQuery } from 'reduxFeatures/chatrooms/chatroomApi';

// Components 🧱
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import ChatCard from 'components/cards/ChatCard';

// Types 🦄
import { Chatroom } from 'reduxFeatures/chatrooms/types';
import BackButton from 'components/buttons/BackButton';
import { useNavigation } from '@react-navigation/native';
import { CoreStyleSheet } from 'styleSheets/CoreDesignStyleSheet';

const LessorChatIndexScreen = () => {
  const {data, isLoading} = useGetChatroomsQuery();
  const navigation = useNavigation();

  if(isLoading) {
    return <LoadingComponent/>;
  }

  return(
     <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton title="Chats" onPress={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {data.chatrooms.map((el: Chatroom) => <ChatCard name={el.name} read={el.message.read}/>)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.White[100],
    alignItems: 'center'
  },
});

export default LessorChatIndexScreen;
