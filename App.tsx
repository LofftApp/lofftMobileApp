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

// Google Auth
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Storage 📁
import EncryptedStorage from 'react-native-encrypted-storage';

// Redux 🏗️
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import {checkToken} from '@Redux/authentication/authenticationMiddleware';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';

// Navigators 🧭
import GuestStackNavigator from './navigationStacks/GuestNavigator';
import NewUserNavigator from './navigationStacks/NewUserNavigator';
import DashboardNavigator from './navigationStacks/DashboardNavigator';
import LessorNavigator from './navigationStacks/LessorNavigator';
import DashboardNavigatorLessor from './navigationStacks/DashboardnavigtatorLessor';

// Dev Screesn 🛠️
import AdminScreen from '@Screens/admin/adminScreen';

const RootStack = createNativeStackNavigator();

const App = () => {
  const [authenticated, profile, admin] = useAppSelector((state: any) => [
    state.authentication.authenticated,
    true,
    state.authentication.admin,
  ]);
  const dispatch = useAppDispatch();
  // Set an initializing state whilst Firebase connects
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // TODO: sync with new api
  // const currentUser: any = await auth()?.currentUser;

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '25055797109-1sk2pvk5a2n796hlagtm37afpb4d47tk.apps.googleusercontent.com',
  //     offlineAccess: true,
  //   });
  // }, []);
  useEffect(() => {
    dispatch(checkToken());
    if (initializing) setInitializing(false);
  }, [authenticated]);

  // Mapbox
  MapboxGL.setWellKnownTileServer(
    Platform.OS === 'android' ? 'Mapbox' : 'mapbox',
  );
  MapboxGL.setAccessToken(MAPBOX_API_KEY);
  // This is needed to use Mapbox in offline mode and with android emulator
  MapboxGL.setTelemetryEnabled(false);
  console.log('authenticated', authenticated);
  return (
    <>
      {!authenticated ? (
        <GuestStackNavigator />
      ) : (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          {admin ? (
            <RootStack.Screen name="admin" component={AdminScreen} />
          ) : null}
          {!profile ? (
            <RootStack.Screen name="profileFlow" component={NewUserNavigator} />
          ) : null}
          {/* {landlord && landlord.length > 0 ? (
            <RootStack.Screen
              name="dashboardLessor"
              component={DashboardNavigatorLessor}
            />
          ) : ( */}
          <RootStack.Screen name="dashboard" component={DashboardNavigator} />
          {/* )} */}
        </RootStack.Navigator>
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
