import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';
import { CoreStyleSheet } from 'styleSheets/CoreDesignStyleSheet';
import { Looking } from 'assets';
import { fontStyles } from 'styleSheets/fontStyles';

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
        {data.chatrooms.length === 0 ?
        <View style={styles.containerNoChatrooms}>
          <Looking />
          <Text style={[fontStyles.headerMedium, styles.centerText]}>You'dont have any active chats</Text>
          <Text style={[fontStyles.bodyMedium, styles.centerText]}>Chats are only available after you’ve created a short-list of people you’d like to invite for interviews or flat viewing.</Text>
        </View>
          :
        <View style={styles.container}>
          {data.chatrooms.map((el: Chatroom) => <ChatCard key={el.id} match={el.matchScore} name={el.name} read={el.message.read} photo={el.userPhoto} content={el.message.content} createdAt={el.message.createdAt} />)}
        </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  containerNoChatrooms: {
    flex: 1,
    backgroundColor: Color.White[100],
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Color.White[100],
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
    marginTop: 15,
  },
});

export default LessorChatIndexScreen;
