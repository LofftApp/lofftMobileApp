import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SwitchUserScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Switch User Screen</Text>
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

export default SwitchUserScreen;
