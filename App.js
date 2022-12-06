import React, {useState, useEffect} from 'react';
// FireStore 🔥
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './src/navigation/RootNavigation';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AnotherScreen from './src/screens/AnotherScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';

// Find Lofft Journey
import StartJourney from './src/screens/StartJourney';
import AboutYouFlatHuntScreen from './src/screens/renterJourneyScreens/AboutUserScreen';
import GenderIdentityScreen from './src/screens/renterJourneyScreens/GenderIdentityScreen';
import SelectCityScreen from './src/screens/renterJourneyScreens/SelectCityScreen';
import FinderBudgetScreen from './src/screens/renterJourneyScreens/FinderBudgetScreen';
import FlatFeaturesScreen from './src/screens/renterJourneyScreens/FlatFeaturesScreen';
import SelfDescribeScreen from './src/screens/renterJourneyScreens/SelfDescribeScreen';

const Stack = createStackNavigator();

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Use Effect for dev environment
  useEffect(() => {
    if (__DEV__) {
      console.log('FireStore Development Environment');
      let host = 'localhost';
      // If using Mobile device set the host as local IP
      host = '192.168.1.167';
      firestore().useEmulator(host, 8080);
      auth().useEmulator(`http://${host}:9099`);
    }
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      {user ? (
        <>
          <Stack.Screen
            name="StartJourney"
            component={StartJourney}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AnotherScreen"
            component={AnotherScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AboutYouFlatHuntScreen"
            component={AboutYouFlatHuntScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GenderIdentityScreen"
            component={GenderIdentityScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelectCityScreen"
            component={SelectCityScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FinderBudgetScreen"
            component={FinderBudgetScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FlatFeaturesScreen"
            component={FlatFeaturesScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelfDescribeScreen"
            component={SelfDescribeScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => SplashScreen.hide()}>
      <App />
    </NavigationContainer>
  );
};
