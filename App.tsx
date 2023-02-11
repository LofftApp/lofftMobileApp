import React, {useState, useEffect} from 'react';
import LogRocket from '@logrocket/react-native';

// FireStore 🔥
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {checkUserProfileExist} from './src/api/firebase/firestoreActions';

// Components 🪢
import LofftIcon from '@Components/lofftIcons/LofftIcon';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './src/navigation/RootNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Navigators 🧭
import GuestStackNavigator from './navigationStacks/GuestNavigator';
import NewUserNavigator from './navigationStacks/NewUserNavigator';

// StyleSheets 🖼️
import Color from './src/styles/lofftColorPallet.json';

// Dev Screesn 🛠️
import AdminScreen from '@Screens/devScreens/adminScreen';

// User Journey Finder
import FlatListScreen from './src/screens/renterFlatFindScreens/FlatFindScreen';
import AlertsScreen from './src/screens/renterFlatFindScreens/AlertsScreen';
import UserScreen from './src/screens/renterFlatFindScreens/UserScreen';
import FavoriteFlatScreen from './src/screens/renterFlatFindScreens/FavoriteFlatScreen';
import ApplyForFlatScreen from './src/screens/renterFlatFindScreens/ApplyForFlatScreen';

import TempScreen from '@Screens/renterFlatFindScreens/TempScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(false);
  const [admin, setAdmin] = useState(false);

  const onAuthStateChanged = async (user: React.SetStateAction<any>) => {
    const currentUser: any = await auth()?.currentUser?.getIdTokenResult();
    currentUser?.claims?.role ? setAdmin(true) : setAdmin(false);

    setUser(user);
    if (user) {
      const profileExist: any = await checkUserProfileExist();
      setUserType(profileExist);
    }
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const currentUser = auth().currentUser;
    LogRocket.init('2y6ler/lofft');

    // Currently added with no restriction, though once the user will have option to approve that their data is stored.

    if (currentUser) {
      const credentials: any = {
        name: currentUser.displayName,
        email: currentUser.email,
      };
      LogRocket.identify(currentUser.uid, credentials);
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  GoogleSignin.configure({
    webClientId:
      '25055797109-13te2c0d3acitt9dvjs212ujgt4odr9q.apps.googleusercontent.com',
  });
  // Use Effect for dev environment
  useEffect(() => {
    firestore().settings({
      persistence: false, // ! This should be true when in production and limited to 50mb or 4e+8
      cacheSizeBytes: 4e9,
    });
    if (__DEV__) {
      console.log('FireStore Development Environment');
      let host = 'localhost';
      // If using Mobile device set the host as local IP
      host = '127.0.0.1';
      if (host === 'localhost') {
        console.log('Host running on local host');
      } else {
        console.log(`Host is running on ${host}`);
      }
      firestore().useEmulator(host, 8080);
      auth().useEmulator(`http://${host}:9099`);
    }
  }, []);

  if (initializing) {
    return null;
  }
  return (
    <>
      {userType ? (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color}) => {
              let iconName = 'settings';
              switch (route.name) {
                case 'search':
                  iconName = 'search-sm';
                  break;
                case 'favorite':
                  iconName = 'heart';
                  break;
                case 'alerts':
                  iconName = 'bell';
                  break;
                case 'user':
                  iconName = 'user';
                  break;
              }
              return <LofftIcon name={iconName} size={25} color={color} />;
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
          <Tab.Screen
            name="favorite"
            component={FavoriteFlatScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="alerts"
            component={AlertsScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="user"
            component={UserScreen}
            options={{headerShown: false}}
          />

          <Tab.Screen
            name="Ello"
            component={TempScreen}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      ) : user ? (
        <NewUserNavigator />
      ) : (
        <GuestStackNavigator />
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
