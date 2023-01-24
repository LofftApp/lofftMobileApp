import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Save user profile

export const createUserProfile = async (data: any) => {
  const userData = {
    profileDetails: {
      genderIdentity: data.genderIdentity || '',
      userDescription: data.userDescription || '',
      personalPreferences: data.personalPreferences || {},
    },
    searchCriteria: {
      districts: data.districts || {},
      flatPreferences: data.flatPreferences || {},
      maxRent: data.maxRent || 10000,
      minRent: data.minRent || 0,
      warmRent: data.warmRent || false,
    },
    savedFlats: [],
  };

  const currentUserId = data.userId || auth().currentUser?.uid;
  await firestore().collection('users').doc(currentUserId).set(userData);
};

export const createFlatProfile = async (data: any) => {
  const currentUserId = data.userId || auth().currentUser?.uid;
  const userAddedToData = data;
  userAddedToData.user = currentUserId;

  const response = await (
    await firestore().collection('flats').add(userAddedToData)
  ).get();
  const flatID = response.id;

  await firestore()
    .collection('users')
    .doc(currentUserId)
    .set({flats: [flatID]});
};

export const checkUserProfileExist = async () => {
  const currentUserId = await auth().currentUser?.uid;
  try {
    const response = await firestore()
      .collection('users')
      .doc(currentUserId)
      .get();
    if (response.data()) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
