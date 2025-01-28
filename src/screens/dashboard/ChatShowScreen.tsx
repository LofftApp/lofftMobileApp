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
// import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import useWebSocket from 'hooks/useWebSocket';
import Dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {fontStyles} from 'styleSheets/fontStyles';

Dayjs.extend(utc);
Dayjs.extend(timezone);

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
  const [errorDetected, setErrorDetected] = useState({
    content: '',
    detected: false,
    errorId: '',
  });
  const [errorMessage, setErrorMessage] = useState(
    'Akward, sth went wrong ...',
  );

  const {messages, setMessages} = useWebSocket(chatroomId);
  console.log(messages);

  // Load initial messages and mark them as read
  useFocusEffect(
    useCallback(() => {
      if (data?.messages) {
        setMessages(sortMessages([...data.messages]));
      }
      return () => readAllMessages(chatroomId);
    }, [chatroomId, data?.messages, readAllMessages, setMessages]),
  );

  // Scroll to bottom when coming onto screen
  useEffect(() => {
    if (activateFirstScroll && flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});

      setActivateScroll(false);
    }
  }, [activateFirstScroll]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await createMessage({id: chatroomId, content: newMessage}).unwrap();
        setNewMessage('');
      } catch (error) {
        const typedError = error as {status?: number};
        const errorId = Math.random().toString(36).substr(2, 9);

        // Set error message and detected state
        const errorM =
          typedError.status === 422
            ? 'Something went wrong'
            : 'An error occurred';
        setErrorMessage(errorM);
        setErrorDetected({
          content: newMessage,
          detected: true,
          errorId: errorId,
        });

        setMessages(prevMessages =>
          prevMessages.map(message =>
            message.content === newMessage
              ? {...message, errorId: errorId}
              : message,
          ),
        );
      }
    }
  };

  const reHandleSendMessage = async (newMessageContent: string) => {
    if (newMessageContent.trim()) {
      try {
        await createMessage({
          id: chatroomId,
          content: newMessageContent,
        }).unwrap();

        setMessages(prevData => {
          const uniqueMessages = prevData.filter(
            message =>
              !(message.content === newMessageContent && message.errorId),
          );
          return uniqueMessages;
        });

        setErrorDetected({content: '', detected: false, errorId: ''});
        // Clear the input message
        setNewMessage('');
      } catch (error) {
        // Handle errors
        const typedError = error as {status?: number};
        if (typedError.status === 422) {
          setErrorMessage('Something went wrong');
          setErrorDetected({
            content: newMessageContent,
            detected: true,
            errorId: Math.random().toString(36).substr(2, 9),
          });
        } else {
          setErrorMessage('An error occurred');
          setErrorDetected({
            content: newMessageContent,
            detected: true,
            errorId: Math.random().toString(36).substr(2, 9),
          });
        }
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
    const currentDateKey = Dayjs(currentCreatedDate).format('YYYY-MM-DD');
    const nextDateKey = nextCreatedDate
      ? Dayjs(nextCreatedDate).format('YYYY-MM-DD')
      : null;
    // Render header if the current date differs from the next or if it's the last item
    const shouldRenderDateHeader = currentDateKey !== nextDateKey || isLastItem;

    return (
      <View>
        {/* Render Date Header */}
        {shouldRenderDateHeader && (
          <Text style={styles.dateHeader}>
            {Dayjs(currentCreatedDate).isSame(Dayjs(), 'day')
              ? 'Today'
              : Dayjs(currentCreatedDate).format('DD.MM')}
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
            <>
              {item.content === errorDetected.content &&
              errorDetected.detected ? (
                <Text>
                  <Text
                    style={[
                      fontStyles.bodySmall,
                      styles.messageText,
                      isUserMessage && styles.userMessageText,
                    ]}>
                    {item.content}
                  </Text>
                  {'\n'}
                  <Text style={styles.errorMessageText}>{errorMessage}</Text>
                  {'\n'}
                  <Text
                    style={[styles.sendAgain]}
                    onPress={() => reHandleSendMessage(errorDetected.content)}>
                    Try Again ↩︎
                  </Text>
                </Text>
              ) : (
                <Text
                  style={[
                    fontStyles.bodySmall,
                    styles.messageText,
                    isUserMessage && styles.userMessageText,
                  ]}>
                  {item.content}
                </Text>
              )}
            </>
          )}
          <Text
            style={
              isUserMessage
                ? styles.userMessageTimeStamp
                : styles.otherMessageTimeStamp
            }>
            {Dayjs(currentCreatedDate).tz('CET').format('HH:mm')}
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
  sendAgain: {
    color: Color.White[100],
    textDecorationLine: 'underline',
  },
  flatListStyle: {
    paddingVertical: size(10),
  },
  lastMessageReversed: {
    marginBottom: size(100),
  },
  textInput: {
    flex: 1,
    minHeight: size(40),
    backgroundColor: '#fff',
    paddingTop: size(14),
    paddingLeft: size(9),
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Color.Black[50],
    paddingHorizontal: size(4),
    height: size(48),
    justifyContent: 'center',
    alignItems: 'center',
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
  errorMessageText: {
    color: Color.Tomato[100],
  },
});

export default ChatShowScreen;
