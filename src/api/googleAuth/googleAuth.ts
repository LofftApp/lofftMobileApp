import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '25055797109-1sk2pvk5a2n796hlagtm37afpb4d47tk.apps.googleusercontent.com',
  offlineAccess: true,
});

export const GoogleSignUp = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn().then(result => {
      console.log(result);
    });
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('User cancelled the login flow !');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Signin in progress');
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google play services not available or outdated !');
      // play services not available or outdated
    } else {
      console.log(error);
    }
  }
};
