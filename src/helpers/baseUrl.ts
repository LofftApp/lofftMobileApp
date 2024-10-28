import {LOFFT_BASE_URL_IOS, LOFFT_BASE_URL_ANDROID} from '@env';
import {Platform} from 'react-native';
export const baseUrl =
  Platform.OS === 'ios' ? LOFFT_BASE_URL_IOS : LOFFT_BASE_URL_ANDROID
