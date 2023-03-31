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
  const dispatch = useAppDispatch();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  const user = useAppSelector(state => {
    console.log('state', state.authentication);
    return state.authentication.token;
  });
  console.log('user', user);

  // TODO: sync with new api
  // const currentUser: any = await auth()?.currentUser;
  // dispatch(checkAdmin());
  // dispatch(setUserID(currentUser?.uid || null));
  // dispatch(fetchUserProfile(currentUser?.uid || null));
  // setUser(user);

  // Mapbox
  MapboxGL.setWellKnownTileServer(
    Platform.OS === 'android' ? 'Mapbox' : 'mapbox',
  );
  MapboxGL.setAccessToken(MAPBOX_API_KEY);
  // This is needed to use Mapbox in offline mode and with android emulator
  MapboxGL.setTelemetryEnabled(false);

  // TODO: This will need to be placed in another useEffect with new DB path.
  if (initializing) setInitializing(false);

  // Use Effect for dev environment
  useEffect(() => {
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
    }
  }, []);

  const [profile, admin] = useAppSelector(state => [
    false,
    state.authentication.admin,
  ]);

  const [landlord, setLandLord] = useAppSelector(state => [state.user.flats]);
  // console.log('landlord:', landlord.length > 0 || null);

  console.log(landlord);

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
          {landlord && landlord.length > 0 ? (
            <RootStack.Screen
              name="dashboardLessor"
              component={DashboardNavigatorLessor}
            />
          ) : (
            <RootStack.Screen name="dashboard" component={DashboardNavigator} />
          )}
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
