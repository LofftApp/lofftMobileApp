import notifee, {AndroidImportance} from '@notifee/react-native';
export const setupAndroidNotificationChannel = async () => {
  try {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    console.log('Android notification channel created');
  } catch (error) {
    console.error('Error creating notification channel:', error);
  }
};
