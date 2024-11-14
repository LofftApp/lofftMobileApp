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

// Navigation 🚀
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';

// Navigators 🧭
import GuestStackNavigator from 'navigationStacks/GuestNavigator';
import NewUserNavigator from 'navigationStacks/NewUserNavigator';
import TenantNavigator from 'navigationStacks/TenantNavigator';
import LessorNavigator from 'navigationStacks/LessorNavigator';

// Dev Screesn 🛠️
import AdminScreen from 'screens/admin/adminScreen';

//Components 🪢
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

// Remove ErrorBoundary in production

const RootStack = createNativeStackNavigator();
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
              component={LessorNavigator}
            />
          ) : (
            <RootStack.Screen name="dashboard" component={TenantNavigator} />
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
