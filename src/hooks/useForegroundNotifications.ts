import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const useForegroundNotifications = (isAuth: boolean) => {
  useEffect(() => {
    if (!isAuth) {
      return;
    }
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);

      const body = remoteMessage.notification?.body;
      const title = remoteMessage.notification?.title;

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId: 'default', // Ensure this matches the channel ID
        },
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [isAuth]);
};

export default useForegroundNotifications;
