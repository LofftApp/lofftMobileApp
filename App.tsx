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
import {useAuth} from 'reduxFeatures/auth/useAuth';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Navigation 🚀
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';

// Navigators 🧭
import GuestStackNavigator from 'navigationStacks/GuestNavigator';
import NewUserNavigator from 'navigationStacks/NewUserNavigator';
import DashboardNavigator from 'navigationStacks/DashboardNavigator';
import DashboardNavigatorLessor from 'navigationStacks/DashboardnavigtatorLessor';

// Dev Screesn 🛠️
import AdminScreen from 'screens/admin/adminScreen';

//Components 🪢
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

// Remove ErrorBoundary in production

const RootStack = createNativeStackNavigator();
const App = () => {
  const isAuth = useAuth();
  console.log('isAuth', isAuth);

  const {data, isLoading} = useGetUserQuery(undefined, {
    skip: !isAuth,
  });

  const userType = data?.user.userType;
  const admin = data?.user.admin;

  // Mapbox
  MapboxGL.setWellKnownTileServer(
    Platform.OS === 'android' ? 'Mapbox' : 'mapbox',
  );
  MapboxGL.setAccessToken(MAPBOX_API_KEY);
  // This is needed to use Mapbox in offline mode and with android emulator
  MapboxGL.setTelemetryEnabled(false);

  // Use Effect for dev environment
  useEffect(() => {
    if (__DEV__) {
      console.log('Lofft API Development Environment');
      // If using Mobile device set the host as local IP
      const host = 'localhost';
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

  return (
    <>
      {!isAuth ? (
        <GuestStackNavigator />
      ) : (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          {admin ? (
            <RootStack.Screen name="admin" component={AdminScreen} />
          ) : null}
          {userType === 'newuser' ? (
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
