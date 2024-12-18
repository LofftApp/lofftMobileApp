import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';

// Redux 🛜
import { useGetChatroomsQuery } from 'reduxFeatures/chatrooms/chatroomApi';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

const LessorChatIndexScreen = () => {
  const {data, isLoading} = useGetChatroomsQuery();
  console.log(data);

  if(isLoading) {
    return <LoadingComponent/>;
  }

  return(
    <View style={styles.container}>
      <Text>Hello from LessorChatIndexScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.White[100],
  },
});

export default LessorChatIndexScreen;
