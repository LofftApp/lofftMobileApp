import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const LessorNotificationScreen = () => {
  return (
    <View style={styles.lessorActionContainer}>
      <Text>Hello from Lessor Notification Screen 🥷🏻</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lessorActionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LessorNotificationScreen;
