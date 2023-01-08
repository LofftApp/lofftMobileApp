import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const errorHandling = (err: any) => {
  if (err.code === 'auth/invalid-email') {
    return {
      error: true,
      target: 'email',
      message: 'That email address is invalid!',
    };
  }
  if (err.code === 'auth/email-already-in-use') {
    return {
      error: true,
      target: 'email',
      message: 'That email address is already in use!',
    };
  }
  if (err.code === 'auth/user-not-found') {
    return {
      error: true,
      target: 'email',
      message: 'The user cannot be found.',
    };
  }
  if (err.code === 'auth/wrong-password') {
    return {
      error: true,
      target: 'password',
      message: 'The password is incorrect.',
    };
  }
  if (err.code === 'auth/weak-password') {
    return {
      error: true,
      target: 'password',
      message: 'The password is not strong enough.',
    };
  }
  if (err.code === 'auth/user-disabled') {
    return {
      error: true,
      target: 'password',
      message: 'This user account is disabled!',
    };
  }
};

// Email Signup
export const handleSignUp = async ({email, password}: any) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (err: any) {
    return errorHandling(err);
  }
};

// Email signin
export const handleSignIn = async ({email, password, setMessage}: any) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    console.log('Login');
  } catch (err: any) {
    console.log(err);
    return setMessage(errorHandling(err));
  }
};

// Apple Sign in

export const onAppleButtonPress = async () => {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  // Create a Firebase credential from the response
  const {identityToken, nonce} = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential);
};

// Google Sign in

GoogleSignin.configure({
  webClientId:
    '25055797109-i53siuqchf97orhvbsee4pmfc1sauv8j.apps.googleusercontent.com',
});

export const onGoogleButtonPress = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  console.log(googleCredential);
  // Sign-in the user with the credential
  const userSignIn = auth().signInWithCredential(googleCredential);
  userSignIn.then(result => console.log(result));
};
