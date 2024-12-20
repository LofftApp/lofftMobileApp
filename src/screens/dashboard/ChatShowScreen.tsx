import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
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
import LofftIcon from 'components/lofftIcons/LofftIcon';
import { size } from 'react-native-responsive-sizes';
import { fontStyles } from 'styleSheets/fontStyles';


const ChatShowScreen = ({ route }: ChatShowProp) => {
  const { chatroomId, currentUser, isLessor } = route.params;
  const { data, isLoading } = useGetChatroombyIdQuery(chatroomId);
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigation();

  if (isLoading) {
    return <LoadingComponent />;
  }

  const handleSendMessage = () => {

  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUserMessage = currentUser === item.userId;
    return (
      <View
        style={[
          styles.messageContainer,
          isLessor ?
          (isUserMessage ? styles.userMessageContainerLessor : styles.otherMessageContainer)
          :
          (isUserMessage ? styles.userMessageContainerTenant : styles.otherMessageContainer),
        ]}
      >
        {item.content !== '' && (
          <Text
            style={[
              styles.messageText, fontStyles.bodyMedium,
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
          contentContainerStyle={styles.flatListStyle}
        />

        <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} value={newMessage} onChangeText={setNewMessage} placeholder="Type your message" multiline={true} />
            <Pressable style={isLessor ? styles.sendButtonLessor : styles.sendButton} onPress={handleSendMessage} disabled={newMessage === ''} >
              <LofftIcon size={size(31)} color={Color.White[100]} name="send" />
            </Pressable>
        </View>
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
    flex:1,
  },
   inputContainer: {
    padding: size(10),
    backgroundColor: Color.White[100],
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 3,
    position: 'absolute',
    bottom: 0,
  },
  flatListStyle:{
    padding: size(10),
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: size(10),
    minHeight: size(40),
    backgroundColor: '#fff',
    paddingTop: size(10),
  },
  sendButtonLessor: {
    backgroundColor: Color.Lavendar[100],
    borderRadius: 5,
    padding: size(10),
    marginLeft: size(10),
    alignSelf: 'flex-end',
  },
  sendButton: {
    backgroundColor: Color.Mint[100],
    borderRadius: 5,
    padding: size(10),
    marginLeft: size(10),
    alignSelf: 'flex-end',
  },
  sendButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: size(10),
    borderRadius: 10,
    marginVertical: size(5),
    marginHorizontal: size(10),
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
    flexWrap: 'wrap',
  },
  userMessageText: {
    color: Color.White[100],
  },
  userMessageTimeStamp: {
    color: '#E8E8E8',
    marginTop: size(5),
    textAlign: 'right',
  },
  otherMessageTimeStamp: {
    color: '#8E8E8E',
    marginTop: size(5),
    textAlign: 'right',
  },
});

export default ChatShowScreen;
