import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from './src/styles/lofftColorPallet.json';

// FireStore 🔥
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './src/navigation/RootNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Find Lofft Journey
import StartJourney from './src/screens/StartJourney';
import AboutYouFlatHuntScreen from './src/screens/renterJourneyScreens/AboutUserScreen';
import GenderIdentityScreen from './src/screens/renterJourneyScreens/GenderIdentityScreen';
import SelectCityScreen from './src/screens/renterJourneyScreens/SelectCityScreen';
import FinderBudgetScreen from './src/screens/renterJourneyScreens/FinderBudgetScreen';
import FlatFeaturesScreen from './src/screens/renterJourneyScreens/FlatFeaturesScreen';
import SelfDescribeScreen from './src/screens/renterJourneyScreens/SelfDescribeScreen';
import UserConditionsScreen from './src/screens/UserConditionsScreen';
import FlatListScreen from './src/screens/renterFlatFindScreens/FlatListScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [admin, setAdmin] = useState(false);

  const onAuthStateChanged = async user => {
    setUser(user);
    console.log(user);
    if (user) {
      const userClaims = await user.getIdTokenResult();
      setUserType(userClaims.claims.primaryUserType);
      setAdmin(userClaims.claims.admin);
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  GoogleSignin.configure({
    webClientId:
      '25055797109-13te2c0d3acitt9dvjs212ujgt4odr9q.apps.googleusercontent.com',
  });
  // Use Effect for dev environment
  useEffect(() => {
    if (__DEV__) {
      console.log('FireStore Development Environment');
      let host = 'localhost';
      // If using Mobile device set the host as local IP
      // host = '192.168.1.16';
      if (host === 'localhost') {
        console.log('Host running on local host');
      } else {
        console.log(`Host is running on ${host}`);
      }
      firestore().useEmulator(host, 8080);
      auth().useEmulator(`http://${host}:9099`);
    }
  }, []);

  if (initializing) return null;
  return (
    <>
      {user && userType ? (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color}) => {
              let iconName = 'Not sure';
              if (route.name === 'search') {
                iconName = 'search-outline';
              }
              return <Icon name={iconName} size={25} color={color} />;
            },
            tabBarActiveTintColor: Color.Lavendar[100],
            tabBarInActiveTintColor: Color.Black[30],
            tabBarShowLabel: false,
          })}>
          <Tab.Screen
            name="search"
            component={FlatListScreen}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="SignInScreen">
          {user ? (
            <>
              <Stack.Screen
                name="StartJourney"
                component={StartJourney}
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
              <Stack.Screen
                name="UserConditionsScreen"
                component={UserConditionsScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FlatListScreen"
                component={FlatListScreen}
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
      )}
    </>
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
