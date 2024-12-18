import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';

const LessorChatIndexScreen = () => {
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
