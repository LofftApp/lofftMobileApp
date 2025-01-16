import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text, Pressable } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';
import { CoreStyleSheet } from 'styleSheets/CoreDesignStyleSheet';
import { Looking } from 'assets';

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
import { createFontStyles } from 'styleSheets/fontStyles';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxCore/store';

type ChatroomNavigationProps = NativeStackNavigationProp<ChatroomsStackParamsList, 'ChatShow'>;

const ChatIndexScreen = () => {
  const coreStyles = CoreStyleSheet();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = isDarkMode ?  Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);
  const { data: currentUser } = useGetUserQuery();
  const isLessor = currentUser?.userType === 'lessor';
  const { data, isLoading, refetch } = useGetChatroomsQuery();
  const navigation = useNavigation<ChatroomNavigationProps>();

  useFocusEffect(
      useCallback(() => {
        if(data?.chatrooms && data?.chatrooms?.length > 0) {
        refetch();
      }
        return () => {
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };
      }, [data?.chatrooms, refetch])
    );



  useEffect(() => {
    if(data?.chatrooms && data?.chatrooms?.length > 0) {
       refetch();
    }
  }, [data?.chatrooms, refetch]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  const styles = StyleSheet.create({
    containerNoChatrooms: {
      flex: 1,
      backgroundColor: colors.White[100],
      alignItems: 'center',
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: colors.White[100],
      alignItems: 'center',
    },
    centerText: {
      textAlign: 'center',
      marginTop: 15,
    },
  });

  return (
    <SafeAreaView style={coreStyles.safeAreaViewShowContainer}>
      <BackButton title="Chats" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {data?.chatrooms.length === 0 ? (
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
            {data?.chatrooms.map((chatroom: Chatroom) => (
              <Pressable
                key={chatroom.id}
                onPress={() =>
                  navigation.navigate('ChatShow', {
                    chatroomId: chatroom.id,
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

export default ChatIndexScreen;
