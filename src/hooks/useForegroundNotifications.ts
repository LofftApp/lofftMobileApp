import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {handleForegroundNotifications} from 'reduxFeatures/firebaseNotifications/handleForegroundNotifications';

export const useForegroundNotifications = (isAuth: boolean) => {
  useEffect(() => {
    if (!isAuth) {
      return;
    }

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await handleForegroundNotifications(remoteMessage);
    });

    return () => unsubscribe();
  }, [isAuth]);
};
