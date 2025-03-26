import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  FlatList,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {Looking} from 'assets';
import {fontStyles} from 'styleSheets/fontStyles';

// Redux 🛜
import {useGetChatroomsQuery} from 'reduxFeatures/chatrooms/chatroomApi';

// Components 🧱
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import ChatCard from 'components/cards/ChatCard';
import BackButton from 'components/buttons/BackButton';

// Types 🦄
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {ChatroomNavigationProps} from 'navigationStacks/types';
import {CoreButton} from 'components/buttons/CoreButton';

const ChatIndexScreen = () => {
  const {data: currentUser} = useGetUserQuery();
  const isLessor = currentUser?.userType === 'lessor';
  const {data, isLoading, refetch} = useGetChatroomsQuery();
  const navigation = useNavigation<ChatroomNavigationProps>();

  useFocusEffect(
    useCallback(() => {
      if (data?.chatrooms && data?.chatrooms?.length > 0) {
        refetch();
      }
    }, [data?.chatrooms, refetch]),
  );

  if (isLoading) {
    return <LoadingComponent />;
  }

  console.log('hehehe', data);

  return (
    <SafeAreaView
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        styles.centerContainer,
      ]}>
      <BackButton title="Chats" onPress={() => navigation.goBack()} />
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
        <FlatList
          data={data?.chatrooms}
          keyExtractor={chatroom => chatroom.id.toString()}
          renderItem={({item: chatroom}) => (
            <Pressable
              onPress={() =>
                navigation.navigate('ChatShow', {
                  chatroomId: chatroom.id,
                })
              }>
              <ChatCard chatroomData={chatroom} isLessor={isLessor} />
            </Pressable>
          )}
          contentContainerStyle={styles.flatlistContainer}
          style={styles.flatlist}
        />
      )}
      {data?.canOffer && (
        <CoreButton value={'Make an Offer'} style={styles.offerButton} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
  },
  containerNoChatrooms: {
    flex: 1,
    backgroundColor: Color.White[100],
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1, // Ensure FlatList takes up the full space
    width: '100%', // Match parent width
  },
  flatlistContainer: {
    paddingHorizontal: 16, // Add consistent horizontal padding
    alignItems: 'center', // Center items within the FlatList
    justifyContent: 'center', // Optional: vertical centering
  },
  centerText: {
    textAlign: 'center',
    marginTop: 15,
  },
  offerButton: {
    width: '90%',
  },
});

export default ChatIndexScreen;
