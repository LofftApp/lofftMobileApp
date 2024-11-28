import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useRegisterTokenMutation} from 'reduxFeatures/firebaseNotifications/fcmApi';
import {registerDeviceToken} from 'reduxFeatures/firebaseNotifications/registerDeviceToken';
import {handleTokenRefresh} from 'reduxFeatures/firebaseNotifications/handleTokenRefresh';

const useFCMToken = (isAuth: boolean) => {
  const [registerToken] = useRegisterTokenMutation();

  useEffect(() => {
    if (!isAuth) {
      return;
    }
    // Register token on app start
    registerDeviceToken(registerToken);

    // Listen for token refreshes
    const unsubscribe = messaging().onTokenRefresh((newToken) => {
      handleTokenRefresh(newToken, registerToken);
    });

    return () => unsubscribe();
  }, [registerToken, isAuth]);
};

export default useFCMToken;
