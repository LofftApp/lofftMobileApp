import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.mainView}>
      <Text>
        Hello, This is the Lofft welcome screen for version 3 of the mobile
        applicaiton MVP.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
  },
});

export default WelcomeScreen;
