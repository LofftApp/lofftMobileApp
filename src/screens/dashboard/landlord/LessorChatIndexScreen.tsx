import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';
import { CoreStyleSheet } from 'styleSheets/CoreDesignStyleSheet';

// Redux 🛜
import { useGetChatroomsQuery } from 'reduxFeatures/chatrooms/chatroomApi';

// Components 🧱
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import ChatCard from 'components/cards/ChatCard';
import BackButton from 'components/buttons/BackButton';

// Types 🦄
import { Chatroom } from 'reduxFeatures/chatrooms/types';

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
          {data.chatrooms.map((el: Chatroom) => <ChatCard key={el.id} match={el.matchScore} name={el.name} read={el.message.read} photo={el.userPhoto} content={el.message.content} createdAt={el.message.createdAt} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.White[100],
    alignItems: 'center',
  },
});

export default LessorChatIndexScreen;
