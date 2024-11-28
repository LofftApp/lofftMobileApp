import {RegisterTokenType} from './registerDeviceToken';

export const handleTokenRefresh = async (
  newToken: string,
  registerToken: RegisterTokenType,
) => {
  try {
    console.log('FCM Token refreshed:', newToken);

    // Update the backend with the new token using RTK Query
    await registerToken(newToken).unwrap();
    console.log('Token FCM successfully updated');
  } catch (error) {
    console.error('Error refreshing FCM token:', error);
  }
};
