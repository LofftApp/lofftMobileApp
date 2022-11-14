import React from 'react';
import {Text, StyleSheet} from 'react-native';
import ScreenBackButton from '../components/coreComponents/CoreScreens/ScreenBackButton';
import {fontStyles} from '../styles/fontStyles';

const WelcomeScreen = ({navigation}) => {
  return (
    <ScreenBackButton navigation={navigation} title="Back Button">
      <Text style={fontStyles.headerDisplay}>
        This is the Screen with a back button
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
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
