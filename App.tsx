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

// Storage 📁
import EncryptedStorage from 'react-native-encrypted-storage';

// Redux 🏗️
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import {checkToken} from '@Redux/authentication/authenticationMiddleware';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {currentUser} from '@Redux/user/usersMiddleware';

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

  useEffect(() => {
    dispatch(checkToken());
  }, []);

  useEffect(() => {
    dispatch(currentUser());
  }, []);

  // const user = useAppSelector(
  //   (state: any) => state.authentication.authenticated,
  // );


  const myState = useAppSelector((state: any) => console.log(state));

  console.log("Hey I am state:", myState)

  const userType = useAppSelector((state: any) => state.user.userType);

  console.log("Hey I am user:", userType)
  // dispatch(setUserID(currentUser?.uid || null));
  // dispatch(fetchUserProfile(currentUser?.uid || null));
  // setUser(user);
  useEffect(() => {
    if (initializing) {
      setInitializing(false);
    }
  }, [authenticated]);

  // Mapbox
  MapboxGL.setWellKnownTileServer(
    Platform.OS === 'android' ? 'Mapbox' : 'mapbox',
  );
  MapboxGL.setAccessToken(MAPBOX_API_KEY);
  // This is needed to use Mapbox in offline mode and with android emulator
  MapboxGL.setTelemetryEnabled(false);

  // TODO: This will need to be placed in another useEffect with new DB path.

  // Use Effect for dev environment
  useEffect(() => {
    if (__DEV__) {
      console.log('Lofft API Development Environment');
      let host = 'localhost';
      // If using Mobile device set the host as local IP
      host = '127.0.0.1';
      console.log(
        host === 'localhost'
          ? 'Host running on local host'
          : `Host is running on ${host}`,
      );
    }
  }, []);

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
          {userType === 'lessor' ? (
            <RootStack.Screen
              name="dashboardLessor"
              component={DashboardNavigatorLessor}
            />
          ) : (
            <RootStack.Screen name="dashboard" component={DashboardNavigator} />
          )}
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
