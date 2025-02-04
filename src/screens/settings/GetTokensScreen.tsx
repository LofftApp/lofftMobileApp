import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const GetTokensScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Get Tokens Screen</Text>
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

export default GetTokensScreen;
