import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const handleBackgroundNotifications = async () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background message received:', remoteMessage);

    const body = remoteMessage.notification?.body;
    const title = remoteMessage.notification?.title;

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: 'default',
      },
    });
  });
};
