import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text, Pressable } from 'react-native';
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
import { useGetUserQuery } from 'reduxFeatures/user/userApi';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChatroomsStackParamsList } from 'navigationStacks/types';

type ChatroomNavigationProps = NativeStackNavigationProp<ChatroomsStackParamsList, 'ChatShow'>;

const ChatIndexScreen = () => {
  const { data: currentUser } = useGetUserQuery();
  const isLessor = currentUser?.userType === 'lessor';
  const { data, isLoading } = useGetChatroomsQuery();
  const navigation = useNavigation<ChatroomNavigationProps>();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton title="Chats" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.chatrooms.length === 0 ? (
          <View style={styles.containerNoChatrooms}>
            <Looking />
            <Text style={[fontStyles.headerMedium, styles.centerText]}>
              You don't have any active chats
            </Text>
            <Text style={[fontStyles.bodyMedium, styles.centerText]}>
              {isLessor
                ? 'Chats are only available after you’ve created a short-list of people you’d like to invite for interviews or flat viewing.'
                : 'Chats are only available if the landlord has invited you.'}
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            {data.chatrooms.map((chatroom: Chatroom) => (
              <Pressable
                key={chatroom.id}
                onPress={() =>
                  navigation.navigate('ChatShow', {
                    chatroomId: chatroom.id,
                    currentUser: currentUser?.id,
                    isLessor: isLessor,
                  })
                }
              >
                <ChatCard chatroomData={chatroom} isLessor={isLessor} />
              </Pressable>
            ))}
          </View>
        )}
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

export default ChatIndexScreen;
