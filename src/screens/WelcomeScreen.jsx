import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Counter from '../features/counter/counter';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <Text>
        Hello, This is the Lofft welcome screen for version 3 of the mobile
        applicaiton MVP.
      </Text>
      <Counter />
      <Button
        onPress={() => navigation.navigate('AnotherScreen')}
        title="Another Screen =>"
      />
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
