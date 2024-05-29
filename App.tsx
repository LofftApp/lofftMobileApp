/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useCallback} from 'react';
import {Platform} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';

// Redux
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';
import {checkToken} from 'reduxFeatures/authentication/authenticationMiddleware';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createSelector} from '@reduxjs/toolkit';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';
import GuestStackNavigator from './navigationStacks/GuestNavigator';
import NewUserNavigator from './navigationStacks/NewUserNavigator';
import DashboardNavigator from './navigationStacks/DashboardNavigator';
import LessorNavigator from './navigationStacks/LessorNavigator';
import DashboardNavigatorLessor from './navigationStacks/DashboardNavigatorLessor';

// Screens
import AdminScreen from 'screens/admin/adminScreen';

// Utils
import {logWithLocation} from 'helpers/logWithLocation';
import SplashScreen from 'react-native-splash-screen';
import {getProfile} from 'reduxFeatures/user/usersMiddleware';

const RootStack = createNativeStackNavigator();

const App = () => {
  logWithLocation('App Rendered');

  // Define selectors
  const getAuthenticated = (state: any) => state.authentication.authenticated;
  const getUserType = (state: any) => state.user.user.userType;
  const getAdmin = (state: any) => state.user.user.admin;

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
  const [userType, admin] = useAppSelector(selectUserTypeAndAdmin);
  const dispatch = useAppDispatch();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  useEffect(() => {
    if (initializing) setInitializing(false);
    if (authenticated && !userType) dispatch(getProfile());
  }, [authenticated, dispatch, initializing, userType]);

  // Mapbox Configuration
  useEffect(() => {
    MapboxGL.setWellKnownTileServer(
      Platform.OS === 'android' ? 'Mapbox' : 'mapbox',
    );
    MapboxGL.setAccessToken(MAPBOX_API_KEY);
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  // Dev Environment Logging
  useEffect(() => {
    if (__DEV__) {
      console.log('Lofft API Development Environment');
      const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
      console.log(`Host is running on ${host}`);
    }
  }, []);

  return (
    <>
      {!authenticated ? (
        <GuestStackNavigator />
      ) : (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          {admin && <RootStack.Screen name="admin" component={AdminScreen} />}
          {!userType ? (
            <RootStack.Screen name="profileFlow" component={NewUserNavigator} />
          ) : userType === 'lessor' ? (
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

const MainApp = () => (
  <NavigationContainer ref={navigationRef} onReady={() => SplashScreen.hide()}>
    <App />
  </NavigationContainer>
);

export default MainApp;
