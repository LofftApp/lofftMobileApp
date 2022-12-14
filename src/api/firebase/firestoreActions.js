import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Save user profile

export const createUserProfile = async data => {
  // console.log(data);
  const currentUserId = auth().currentUser.uid;
  await firestore()
    .collection('users')
    .doc(currentUserId)
    .set({
      profileDetails: {
        genderIdentity: data.gender,
        aboutUser: data.textAboutUser,
        personalPreferences: data.personalPreferences,
      },
      searchCriteria: {
        districts: data.districts,
        flatPreferences: data.flatPreferences,
        maxRent: data.maxRent,
        minRent: data.minRent,
      },
    });
};

export const checkUserProfileExist = async () => {
  const currentUserId = await auth().currentUser.uid;
  const response = await firestore()
    .collection('users')
    .doc(currentUserId)
    .get()
    .then(q => {
      return q.data() ? true : false;
    });
  return response;
};
