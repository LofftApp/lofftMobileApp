import React, {useCallback, useEffect, useRef, useState} from 'react';
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

import {useFocusEffect, useNavigation} from '@react-navigation/native';

// Components 🧱
import BackButton from 'components/buttons/BackButton';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

// Types 🦄
import {ChatShowProp} from './types';
import {Message} from 'reduxFeatures/chatrooms/types';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {size} from 'react-native-responsive-sizes';

// RTK 🛜
import {
  useCreateMessageMutation,
  useGetChatroombyIdQuery,
  useReadAllMessagesMutation,
} from 'reduxFeatures/chatrooms/chatroomApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Helpers 🥷🏻
import {sortMessages} from 'helpers/sortMessages';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import useWebSocket from 'hooks/useWebSocket';

const ChatShowScreen = ({route}: ChatShowProp) => {
  //Params
  const chatroomId = route.params.chatroomId;
  // Navigation
  const navigation = useNavigation();
  // Redux
  const {data: currentUser} = useGetUserQuery();
  const isLessor = currentUser?.userType === 'lessor';
  const {data, isLoading} = useGetChatroombyIdQuery(chatroomId, {
    refetchOnMountOrArgChange: true,
  });
  const [readAllMessages] = useReadAllMessagesMutation();

  // Local State
  const [newMessage, setNewMessage] = useState('');

  const flatListRef = useRef<FlatList>(null);
  const [createMessage] = useCreateMessageMutation();
  const [activateFirstScroll, setActivateScroll] = useState(true);
  const [errorMessages, setErrorMessages] = useState('');

  const {messages, setMessages} = useWebSocket(chatroomId);

  // Load initial messages and mark them as read
  useFocusEffect(
    useCallback(() => {
      if (data?.messages) {
        setMessages(sortMessages([...data.messages]));
      }
      return () => readAllMessages(chatroomId);
    }, [chatroomId, data?.messages, readAllMessages, setMessages]),
  );

  //REFACTOR TO A USE EFFECT
  // Scroll to bottom when coming onto screen

  useFocusEffect(
    useCallback(() => {
      if (activateFirstScroll && flatListRef.current) {
        flatListRef.current.scrollToOffset({offset: 0, animated: true});

        setActivateScroll(false);
      }
    }, [activateFirstScroll]),
  );

  // HANDLE ERROR IN MESSAGE IS NOT SHOWN IN THE CHAT (see ConditionsOfUseScreen.tsx)
  // display the error in the jsx (red bubble??), (retry button??)
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await createMessage({id: chatroomId, content: newMessage}).unwrap();
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const renderMessage = ({item, index}: {item: Message; index: number}) => {
    const isUserMessage = currentUser?.id === (item.user_id || item.userId);
    const isFirstItem = index === 0;
    const isLastItem = index === messages.length - 1;

    const currentCreatedDate = new Date(
      item.createdAt || item.created_at || '',
    );
    const nextCreatedDate =
      index < messages.length - 1
        ? new Date(
            messages[index + 1].createdAt ||
              messages[index + 1].created_at ||
              '',
          )
        : null;
    // Refactor wtih DayJS
    const currentDateKey = `${currentCreatedDate.getUTCFullYear()}-${
      currentCreatedDate.getUTCMonth() + 1
    }-${currentCreatedDate.getUTCDate()}`;
    const nextDateKey =
      nextCreatedDate &&
      `${nextCreatedDate.getUTCFullYear()}-${
        nextCreatedDate.getUTCMonth() + 1
      }-${nextCreatedDate.getUTCDate()}`;

    // Render header if the current date differs from the next or if it's the last item
    const shouldRenderDateHeader = currentDateKey !== nextDateKey || isLastItem;

    // Refactor to DayJS
    const formattedDate = `${String(currentCreatedDate.getUTCDate()).padStart(
      2,
      '0',
    )}.${String(currentCreatedDate.getUTCMonth() + 1).padStart(2, '0')}`;

    return (
      <View>
        {/* Render Date Header */}
        {shouldRenderDateHeader && (
          <Text style={styles.dateHeader}>
            {/* Refactor to DayJS */}
            {currentDateKey ===
            `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`
              ? 'Today'
              : formattedDate}
          </Text>
        )}
        {/* Render Message */}
        <View
          style={[
            styles.messageContainer,
            isFirstItem && {marginBottom: size(100)}, // Add extra margin for the first message when reversed
            isLessor
              ? isUserMessage
                ? styles.userMessageContainerLessor
                : styles.otherMessageContainer
              : isUserMessage
              ? styles.userMessageContainerTenant
              : styles.otherMessageContainer,
          ]}>
          {item.content && (
            <Text
              style={[
                styles.messageText,
                isUserMessage && styles.userMessageText,
              ]}>
              {item.content}
            </Text>
          )}
          <Text
            style={
              isUserMessage
                ? styles.userMessageTimeStamp
                : styles.otherMessageTimeStamp
            }>
            {/* Refactor to DayJS */}
            {currentCreatedDate.toLocaleTimeString('en-GB', {
              timeZone: 'CET',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <BackButton title="Chat" onPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList
          ref={flatListRef}
          data={messages}
          inverted
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={[
            styles.flatListStyle,
            {paddingBottom: size(100)},
          ]}
        />

        <View style={styles.inputContainer}>
          {/* //On KEY PRESS, Copy InputFieldText.tsx styles, CHAT INPUT COMPONENT */}
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message"
            multiline
          />
          {/* <InputFieldText
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message"
            type="text"
            keyboardType="default"
            errorMessage={errorMessages}
          /> */}

          <Pressable
            style={isLessor ? styles.sendButtonLessor : styles.sendButton}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}>
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
    backgroundColor: Color.White[100],
  },
  chatContainer: {
    flex: 1,
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
  flatListStyle: {
    paddingVertical: size(10),
  },
  lastMessageReversed: {
    marginBottom: size(100),
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
    marginTop: size(2),
    textAlign: 'right',
  },
  otherMessageTimeStamp: {
    color: '#8E8E8E',
    marginTop: size(2),
    textAlign: 'right',
  },
  dateContainer: {
    alignItems: 'center',
    paddingVertical: size(8),
  },
  dateHeader: {
    paddingVertical: size(4),
    paddingHorizontal: size(8),
    borderRadius: 8,
    color: Color.Black[50],
    textAlign: 'center',
  },
});

export default ChatShowScreen;
