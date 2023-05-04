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
import {checkToken} from '@Redux/authentication/authenticationMiddleware';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';
import {getProfile} from '@Redux/user/usersMiddleware';

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
  const [authenticated] = useAppSelector((state: any) => [
    state.authentication.authenticated,
  ]);
  const [userType, admin] = useAppSelector((state: any) => [
    state.user.profile.userType,
    state.user.profile.admin,
  ]);
  const dispatch = useAppDispatch();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    dispatch(checkToken());
  }, []);

  useEffect(() => {
    if (initializing) setInitializing(false);
    if (authenticated && !userType) dispatch(getProfile());
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
  console.log('userType', userType);
  return (
    <>
      {!authenticated ? (
        <GuestStackNavigator />
      ) : (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          {admin ? (
            <RootStack.Screen name="admin" component={AdminScreen} />
          ) : null}
          {!userType ? (
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
