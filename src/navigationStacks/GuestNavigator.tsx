import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import SignUpScreen from 'screens/auth/SignUpScreen';
import SignInScreen from 'screens/auth/SignInScreen';
import ForgotPasswordScreen from 'screens/auth/ForgotPasswordScreen';

const GuestStack = createNativeStackNavigator();

export const GuestStackNavigator = () => {
  return (
    <GuestStack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={{headerShown: false}}>
      <GuestStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <GuestStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <GuestStack.Screen name="SignInScreen" component={SignInScreen} />
    </GuestStack.Navigator>
  );
};

export default GuestStackNavigator;
