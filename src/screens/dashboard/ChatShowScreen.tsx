import React, { useCallback, useEffect, useRef, useState } from 'react';
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

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

// Components 🧱
import BackButton from 'components/buttons/BackButton';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

// Types 🦄
import { ChatShowProp } from './types';
import { Message } from 'reduxFeatures/chatrooms/types';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import { size } from 'react-native-responsive-sizes';
import { fontStyles } from 'styleSheets/fontStyles';

// RTK 🛜
import { useCreateMessageMutation, useGetChatroombyIdQuery, useReadAllMessagesMutation } from 'reduxFeatures/chatrooms/chatroomApi';
import { useGetUserQuery } from 'reduxFeatures/user/userApi';

// Helpers 🥷🏻
import { baseUrl } from 'helpers/baseUrl';
import { toCamelCaseKeys } from 'helpers/toCamelCaseKeys';


const ChatShowScreen = ({ route }: ChatShowProp) => {
  const chatroomId = route.params.chatroomId;
  const { data: currentUser } = useGetUserQuery();
  const isLessor = currentUser?.userType === 'lessor';
  const { data, isLoading } = useGetChatroombyIdQuery(chatroomId, {
    refetchOnMountOrArgChange: true,
  });
  const [readAllMessages] = useReadAllMessagesMutation();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const [createMessage] = useCreateMessageMutation();
  const ws = useRef<WebSocket | null>(null);
  const navigation = useNavigation();
  const [activateFirstScroll, setActivateScroll] = useState(true);

  const sortMessages = (inputMessages: Message[]) => {
    return inputMessages.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.created_at || '');
      const dateB = new Date(b.createdAt || b.created_at || '');
      return dateB.getTime() - dateA.getTime();
    });
  };

  // Initialize WebSocket connection
  useEffect(() => {
    const setupWebSocket = async () => {
      try {
        const token = await EncryptedStorage.getItem('token');
        const wsBase = baseUrl.split('http:')[1];
        const wsUrl = token
          ? `ws:${wsBase}/cable?token=${encodeURIComponent(token)}`
          : `ws:${wsBase}/cable`;

        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
          console.log('WebSocket connection opened');
          ws.current?.send(
            JSON.stringify({
              command: 'subscribe',
              identifier: JSON.stringify({
                id: chatroomId,
                channel: 'ChatroomsChannel',
              }),
            })
          );
        };

        ws.current.onmessage = (event) => {
          const response = JSON.parse(event.data);
          console.log('Received WebSocket message:', response);

          if (response.message?.message) {
            const newMsg = toCamelCaseKeys(response.message.message);
            setMessages((prevMessages) => sortMessages([...prevMessages, newMsg]));
          }
        };

        ws.current.onclose = () => console.log('WebSocket connection closed');
        ws.current.onerror = (error) => console.error('WebSocket error:', error);
      } catch (error) {
        console.error('Error setting up WebSocket:', error);
      }
    };

    if (chatroomId) {setupWebSocket();}

    return () => {
      if (ws.current) {
        ws.current.close();
        console.log('WebSocket connection closed on unmount');
      }
    };
  }, [chatroomId]);

  // Load initial messages and mark them as read
  useFocusEffect(
    useCallback(() => {
      if (data?.messages) {
         setMessages(sortMessages([...data.messages]));
      }
      return () => readAllMessages(chatroomId);
    }, [chatroomId, data?.messages, readAllMessages])
  );

  // Scroll to bottom when coming onto screen
 useFocusEffect(
  useCallback(() => {
    if (activateFirstScroll && flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });

      setActivateScroll(false);
    }
  }, [activateFirstScroll])
);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await createMessage({ id: chatroomId, content: newMessage });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isUserMessage = currentUser?.id === (item.user_id || item.userId);
    const isLastItem = index === messages.length - 1;

    const currentCreatedDate = new Date(item.createdAt || item.created_at || '');
    const nextCreatedDate =
      index < messages.length - 1
        ? new Date(messages[index + 1].createdAt || messages[index + 1].created_at || '')
        : null;

    const currentDateKey = `${currentCreatedDate.getUTCFullYear()}-${currentCreatedDate.getUTCMonth() + 1}-${currentCreatedDate.getUTCDate()}`;
    const nextDateKey =
      nextCreatedDate &&
      `${nextCreatedDate.getUTCFullYear()}-${nextCreatedDate.getUTCMonth() + 1}-${nextCreatedDate.getUTCDate()}`;

    const shouldRenderDateHeader = currentDateKey !== nextDateKey;

    const formattedDate = `${String(currentCreatedDate.getUTCDate()).padStart(2, '0')}.${String(
      currentCreatedDate.getUTCMonth() + 1
    ).padStart(2, '0')}`;

    return (
      <>
        {shouldRenderDateHeader && (
          <Text style={styles.dateHeader}>
            {currentDateKey === `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
              ? 'Today'
              : formattedDate}
          </Text>
        )}
        <View
          style={[
            styles.messageContainer,
            isLastItem && styles.lastMessageReversed,
            isLessor
              ? isUserMessage
                ? styles.userMessageContainerLessor
                : styles.otherMessageContainer
              : isUserMessage
              ? styles.userMessageContainerTenant
              : styles.otherMessageContainer,
          ]}
        >
          {item.content && (
            <Text
              style={[
                styles.messageText,
                fontStyles.bodyMedium,
                isUserMessage && styles.userMessageText,
              ]}
            >
              {item.content}
            </Text>
          )}
          <Text
            style={isUserMessage ? styles.userMessageTimeStamp : styles.otherMessageTimeStamp}
          >
            {currentCreatedDate.toLocaleTimeString('en-GB', {
              timeZone: 'CET',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </>
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          inverted
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListStyle}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message"
            multiline
          />
          <Pressable
            style={isLessor ? styles.sendButtonLessor : styles.sendButton}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
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
