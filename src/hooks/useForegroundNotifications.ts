import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {handleForegroundNotifications} from 'reduxFeatures/firebaseNotifications/handleForegroundNotifications';
import {useAppDispatch} from 'reduxCore/hooks';
import {fcmApi} from 'reduxFeatures/firebaseNotifications/fcmApi';

export const useForegroundNotifications = (isAuth: boolean) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isAuth) {
      return;
    }

    const unsubscribe = messaging().onMessage(remoteMessage => {
      handleForegroundNotifications(remoteMessage);
      dispatch(fcmApi.endpoints.getNotifications.initiate());
    });

    return () => unsubscribe();
  }, [isAuth, dispatch]);
};
