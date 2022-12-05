import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const handleSignUp = async ({email, password}) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
  } catch (err) {
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
    if (err.code === 'auth/weak-password') {
      return {
        error: true,
        target: 'password',
        message: 'The password is not strong enough',
      };
    }
  }
};
