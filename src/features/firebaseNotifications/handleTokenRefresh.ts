import {RegisterTokenType} from './registerDeviceToken';

export const handleTokenRefresh = async (
  newToken: string,
  registerToken: RegisterTokenType,
) => {
  try {
    console.log('FCM Token refreshed:', newToken);
    await registerToken(newToken).unwrap();
    console.log('Token FCM successfully updated');
  } catch (error) {
    console.error('Error refreshing FCM token:', error);
  }
};
