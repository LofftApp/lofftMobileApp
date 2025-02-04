import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SendFeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Send Feedback Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SendFeedbackScreen;
