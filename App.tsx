/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import LogRocket from '@logrocket/react-native';
// Redux 🏗️
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import {setUserID, fetchUserProfile} from '@Redux/user/usersSlice';
// FireStore 🔥
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {checkUserProfileExist} from '@Api/firebase/firestoreActions';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Navigators 🧭
import GuestStackNavigator from './navigationStacks/GuestNavigator';
import NewUserNavigator from './navigationStacks/NewUserNavigator';
import DashboardNavigator from './navigationStacks/DashboardNavigator';

// Dev Screesn 🛠️
import AdminScreen from '@Screens/admin/adminScreen';

const RootStack = createNativeStackNavigator();

const checkUserDataExists = async (uid: string) => {};

const App = () => {
  const dispatch = useAppDispatch();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(false);
  const [admin, setAdmin] = useState(false);

  const onAuthStateChanged = async (user: React.SetStateAction<any>) => {
    const currentUser: any = await auth()?.currentUser;
    const userToken: any = await currentUser?.getIdTokenResult();
    if (currentUser) dispatch(setUserID(currentUser?.uid));

    // Get Current user profile
    dispatch(fetchUserProfile(currentUser?.uid));
    userToken?.claims?.role ? setAdmin(true) : setAdmin(false);

    setUser(user);
    if (user) {
      const profileExist: any = await checkUserProfileExist();
      setUserType(profileExist);
    }
    if (initializing) {
      setInitializing(false);
    }
  };
  const userProfile = useAppSelector((state: any) => state.user.profile);

  useEffect(() => {
    const currentUser = auth().currentUser;
    LogRocket.init('2y6ler/lofft');

    // Currently added with no restriction, though once the user will have option to approve that their data is stored.

    if (currentUser) {
      const credentials: any = {
        name: currentUser.displayName,
        email: currentUser.email,
      };
      LogRocket.identify(currentUser.uid, credentials);
    }
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  GoogleSignin.configure({
    webClientId:
      '25055797109-13te2c0d3acitt9dvjs212ujgt4odr9q.apps.googleusercontent.com',
  });
  // Use Effect for dev environment
  useEffect(() => {
    firestore().settings({
      persistence: false, // ! This should be true when in production and limited to 50mb or 4e+8
      cacheSizeBytes: 4e9,
    });
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
      firestore().useEmulator(host, 8080);
      auth().useEmulator(`http://${host}:9099`);
    }
  }, []);

  if (initializing) {
    return null;
  }
  return (
    <>
      {user ? (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          {admin ? (
            <RootStack.Screen name="admin" component={AdminScreen} />
          ) : userProfile ? (
            <RootStack.Screen name="dashboard" component={DashboardNavigator} />
          ) : (
            <RootStack.Screen name="profileFlow" component={NewUserNavigator} />
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
