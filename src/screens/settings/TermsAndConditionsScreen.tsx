import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const TermsAndConditionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Terms and Conditions Screen</Text>
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

export default TermsAndConditionsScreen;
