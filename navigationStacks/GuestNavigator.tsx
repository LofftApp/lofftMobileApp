import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from 'screens/auth/SignUpScreen';
import SignInScreen from 'screens/auth/SignInScreen';

const GuestStack = createNativeStackNavigator();

export const GuestStackNavigator = () => {
  return (
    <GuestStack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={{headerShown: false}}>
      <GuestStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <GuestStack.Screen name="SignInScreen" component={SignInScreen} />
    </GuestStack.Navigator>
  );
};

export default GuestStackNavigator;
