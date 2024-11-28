/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

//Mapbox 🗺️
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';

// Redux 🏗️
import {useAuth} from 'reduxFeatures/auth/useAuth';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

// Navigation 🚀
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';

// Navigators 🧭
import GuestStackNavigator from 'navigationStacks/GuestNavigator';
import AuthenticatedNavigator from 'navigationStacks/AuthenticatedNavigator';

//Components 🪢
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import {useRequestUserPermission} from 'hooks/useRequestUserPermission';
import useFCMToken from 'hooks/useFcmToken';
import useForegroundNotifications from 'hooks/useForegroundNotifications';

// Remove ErrorBoundary in production

const App = () => {
  const {isAuth} = useAuth();

  const {data, isLoading, isError, error} = useGetUserQuery(undefined, {
    skip: !isAuth,
    refetchOnMountOrArgChange: true,
  });

  const userType = data?.userType;
  const admin = data?.admin;
  const connectionError =
    error && 'status' in error && error.status === 'FETCH_ERROR';
  const [signOut] = useSignOutMutation();

  // Mapbox
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

  // Request for user permission for notifications
  useRequestUserPermission();

  //FCM Token
  useFCMToken(isAuth);

  //Foreground Notifications
  useForegroundNotifications(isAuth);

  const handleBackButton = () => {
    signOut();
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return (
      <NotFoundComponent
        backButton
        onPress={handleBackButton}
        message={
          connectionError
            ? 'Network Error. Please check server or connection'
            : 'Error loading user data and profile. Please try again'
        }
      />
    );
  }

  return (
    <>
      {!isAuth ? (
        <GuestStackNavigator />
      ) : userType ? (
        <AuthenticatedNavigator userType={userType} admin={admin} />
      ) : (
        <NotFoundComponent
          backButton
          onPress={handleBackButton}
          message="Error loading user type. Please try again"
        />
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
