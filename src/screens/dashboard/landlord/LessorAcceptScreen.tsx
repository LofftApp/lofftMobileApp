import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const LessorAcceptScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome at the Accept Lessor Side Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LessorAcceptScreen;
