/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';

// Redux 🏗️
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import {
  setUserID,
  fetchUserProfile,
  setUserProfile,
  checkAdmin,
} from '@Redux/user/usersSlice';
// FireStore 🔥
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Navigators 🧭
import GuestStackNavigator from './navigationStacks/GuestNavigator';
import NewUserNavigator from './navigationStacks/NewUserNavigator';
import DashboardNavigator from './navigationStacks/DashboardNavigator';

// Dev Screesn 🛠️
import AdminScreen from '@Screens/admin/adminScreen';

const RootStack = createNativeStackNavigator();

const App = () => {
  const dispatch = useAppDispatch();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = async (user: React.SetStateAction<any>) => {
    const currentUser: any = await auth()?.currentUser;
    dispatch(checkAdmin());
    dispatch(setUserID(currentUser?.uid || null));
    dispatch(fetchUserProfile(currentUser?.uid || null));
    setUser(user);
  };

  // Mapbox
  MapboxGL.setWellKnownTileServer(
    Platform.OS === 'android' ? 'Mapbox' : 'mapbox',
  );
  MapboxGL.setAccessToken(MAPBOX_API_KEY);
  // This is needed to use Mapbox in offline mode and with android emulator
  MapboxGL.setTelemetryEnabled(false);

  useEffect(() => {
    if (initializing) setInitializing(false);
    return auth().onAuthStateChanged(onAuthStateChanged);
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

  const [profile, admin] = useAppSelector(state => [
    state.user.profile,
    state.user.admin,
  ]);
  return (
    <>
      {user ? (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          {admin ? (
            <RootStack.Screen name="admin" component={AdminScreen} />
          ) : null}
          {!profile ? (
            <RootStack.Screen name="profileFlow" component={NewUserNavigator} />
          ) : null}
          <RootStack.Screen name="dashboard" component={DashboardNavigator} />
        </RootStack.Navigator>
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
