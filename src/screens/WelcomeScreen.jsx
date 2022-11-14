import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Counter from '../features/counter/counter';
import ScreenBackButton from '../components/coreComponents/CoreScreens/ScreenBackButton';

const WelcomeScreen = ({navigation}) => {
  return (
    <View>
      <ScreenBackButton />
      <Text>
        Hello, This is the Lofft welcome screen for version 3 of the mobile
        applicaiton MVP.
      </Text>
      <Counter />
      <Button
        onPress={() => navigation.navigate('AnotherScreen')}
        title="Another Screen =>"
      />
      <Button
        onPress={() => navigation.navigate('SignUpScreen')}
        title="Sign Up Screen =>"
      />
      <Button
        onPress={() => navigation.navigate('SignInScreen')}
        title="Sign In Screen =>"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
