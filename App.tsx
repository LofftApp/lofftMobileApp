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
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';
import {checkToken} from 'reduxFeatures/authentication/authenticationMiddleware';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';
import {getProfile} from 'reduxFeatures/user/usersMiddleware';

// Navigators 🧭
import GuestStackNavigator from './navigationStacks/GuestNavigator';
import NewUserNavigator from './navigationStacks/NewUserNavigator';
import DashboardNavigator from './navigationStacks/DashboardNavigator';
// import LessorNavigator from './navigationStacks/LessorNavigator';
import DashboardNavigatorLessor from './navigationStacks/DashboardnavigtatorLessor';

// Dev Screesn 🛠️
import AdminScreen from 'screens/admin/adminScreen';
import {createSelector} from '@reduxjs/toolkit';

const RootStack = createNativeStackNavigator();

// Remove ErrorBoundary in production
import ErrorBoundary from './src/ErrorBoundary';

const App = () => {
  // Define selectors
  const getAuthenticated = (state: any) => state.authentication?.authenticated;
  const getUserType = (state: any) => state.user?.user?.userType;
  const getAdmin = (state: any) => state.user?.user?.admin;

  // Create memoized selectors
  const selectAuthenticated = createSelector(
    [getAuthenticated],
    authenticated => authenticated,
  );
  const selectUserTypeAndAdmin = createSelector(
    [getUserType, getAdmin],
    (userType, admin) => [userType, admin],
  );
  const authenticated = useAppSelector(selectAuthenticated);
  console.log('authenticated', authenticated);
  const [userType, admin] = useAppSelector(selectUserTypeAndAdmin);

  const dispatch = useAppDispatch();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  useEffect(() => {
    if (initializing) {
      setInitializing(false);
    }
    if (authenticated && !userType) {
      dispatch(getProfile());
    }
  }, [authenticated, dispatch, initializing, userType]);

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
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </NavigationContainer>
  );
};
