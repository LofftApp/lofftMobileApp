import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '@Screens/SignUpScreen';
import SignInScreen from '@Screens/SignInScreen';

const GuestStack = createNativeStackNavigator();

const GuestStackNavigator = () => {
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
