/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Platform} from 'react-native';

//Mapbox 🗺️
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';

// Redux 🏗️
import {useAuth} from 'reduxFeatures/authentication/useAuth';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Navigation 🚀
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';

// Navigators 🧭
import GuestStackNavigator from './navigationStacks/GuestNavigator';
import NewUserNavigator from './navigationStacks/NewUserNavigator';
import DashboardNavigator from './navigationStacks/DashboardNavigator';
// import LessorNavigator from './navigationStacks/LessorNavigator';
import DashboardNavigatorLessor from './navigationStacks/DashboardnavigtatorLessor';

// Dev Screesn 🛠️
import AdminScreen from 'screens/admin/adminScreen';

//Components 🪢
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

// Remove ErrorBoundary in production
import ErrorBoundary from './src/ErrorBoundary';

const RootStack = createNativeStackNavigator();
const App = () => {
  const isAuth = useAuth();
  console.log('isAuth', isAuth);

  const {data, error, isLoading} = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !isAuth,
  });

  const userType = data?.user.userType;
  const admin = data?.user.admin;
  console.log('userType', data?.user.userType);
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

  if (isLoading) {
    return <LoadingComponent />;
  }

  // if (error) {
  //   return <NotFoundComponent backButton message="There was an error getting user" />;
  // }

  return (
    <>
      {!isAuth ? (
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
      {/* <ErrorBoundary> */}
      <App />
      {/* </ErrorBoundary> */}
    </NavigationContainer>
  );
};
