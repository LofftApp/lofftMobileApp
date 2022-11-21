import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './src/RootNavigation';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AnotherScreen from './src/screens/AnotherScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // SplashScreen.hide();
  }, []);
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnotherScreen"
        component={AnotherScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <App />
    </NavigationContainer>
  );
};
