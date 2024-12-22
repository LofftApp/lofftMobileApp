import React, { useEffect, useRef, useState } from 'react';
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
import { Message } from 'reduxFeatures/chatrooms/types';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import { size } from 'react-native-responsive-sizes';
import { fontStyles } from 'styleSheets/fontStyles';

// RTK 🛜
import { useCreateMessageMutation, useGetChatroombyIdQuery } from 'reduxFeatures/chatrooms/chatroomApi';
import EncryptedStorage from 'react-native-encrypted-storage';
import { baseUrl } from 'helpers/baseUrl';

const ChatShowScreen = ({ route }: ChatShowProp) => {
  const { chatroomId, currentUser, isLessor } = route.params;
  const { data, isLoading, refetch } = useGetChatroombyIdQuery(chatroomId, {
    refetchOnMountOrArgChange: true,
  });
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);
  const [createMessage] = useCreateMessageMutation();


    // Use a ref for the WebSocket connection
  const ws = useRef<WebSocket | null>(null);


  // Scroll to bottom when data changes
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }

     async function setupWebSocket() {
      try {
        const token = await EncryptedStorage.getItem('token');
        /* 🚨 Probably best to store localhost in env for production */
        /* 🚨 Ideally have an if Platform === 'ios' then different localhost etc */

        const wsBase = baseUrl.split('http:')[1];
        console.log(wsBase);

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

        ws.current.onmessage = (event: any) => {
          console.log('Message received:', event.data);
          const response = JSON.parse(event.data);
          if (response.message) {
            const newMessage = response.message;
            console.log('New chat message received:', newMessage);

            refetch(); /* on message I just refetch as cable is listening */
          }
        };

        ws.current.onclose = () => console.log('WebSocket connection closed');
        ws.current.onerror = (error) => console.error('WebSocket error:', error);
      } catch (error) {
        console.error('Error setting up WebSocket:', error);
      }
    }

    if (chatroomId) {
      setupWebSocket();
    }

    // Clean up WebSocket connection on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
        console.log('WebSocket connection closed on unmount');
      }
    };

  }, [chatroomId, refetch, data?.messages]);


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


    if (isLoading) {
      return <LoadingComponent />;
    }

  const renderMessage = ({ item, index }: { item: Message, index: number }) => {
    const isUserMessage = currentUser === item.userId;
    const isLastItem = index === data.messages.length - 1;
    return (
      <View
      style={[
        styles.messageContainer,isLastItem &&  styles.lastMessage,
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
            {item.content}
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
      ref={flatListRef}
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
    backgroundColor: Color.White[100],
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
  flatListStyle: {
    paddingVertical:size(10),
  },
  lastMessage: {
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
});

export default ChatShowScreen;
