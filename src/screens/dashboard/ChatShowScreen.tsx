import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components 🧱
import BackButton from 'components/buttons/BackButton';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

// Types 🦄
import { ChatShowProp } from './types';
import { useGetChatroombyIdQuery } from 'reduxFeatures/chatrooms/chatroomApi';
import { Message } from 'reduxFeatures/chatrooms/types';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';


const ChatShowScreen = ({ route }: ChatShowProp) => {
  const { chatroomId, currentUser, isLessor } = route.params;
  const { data, isLoading } = useGetChatroombyIdQuery(chatroomId);
  const navigation = useNavigation();

  if (isLoading) {
    return <LoadingComponent />;
  }

  const renderMessage = ({ item }: { item: Message }) => {
    const isUserMessage = currentUser === item.userId;
    return (
      <View
        style={[
          styles.messageContainer,
          isLessor ?
          (isUserMessage ? styles.userMessageContainerLessor : styles.otherMessageContainer)
          :
          (isUserMessage ? styles.userMessageContainerTenant : styles.otherMessageContainer)
        ]}
      >
        {item.content !== '' && (
          <Text
            style={[
              styles.messageText,
              isUserMessage ? styles.userMessageText : null,
            ]}
          >
            {item.content} {item.userId}
          </Text>
        )}
        <Text style={isUserMessage ? styles.userMessageTimeStamp : styles.otherMessageTimeStamp}>
        {new Date(item.createdAt).toLocaleTimeString('en-GB', {
          timeZone: 'CET',
          hour: '2-digit',
          minute: '2-digit',
        })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <BackButton title="Chat" onPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          data={data.messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 10 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  userMessageContainerTenant: {
    backgroundColor: Color.Mint[100],
    alignSelf: 'flex-end',
    color: 'white',
  },
  userMessageContainerLessor: {
    backgroundColor: Color.Lavendar[100],
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    backgroundColor: '#F4F4F4',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  userMessageText: {
    color: Color.White[100],
  },
  userMessageTimeStamp: {
    color: '#E8E8E8',
    marginTop: 5,
    textAlign: 'right',
  },
  otherMessageTimeStamp: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 5,
    textAlign: 'right',
  },
});

export default ChatShowScreen;
