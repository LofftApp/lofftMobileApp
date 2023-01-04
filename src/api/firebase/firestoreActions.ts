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
  };

  const currentUserId = auth().currentUser?.uid;
  await firestore().collection('users').doc(currentUserId).set(userData);
};

export const createFlatProfile = async (data: any) => {
  const currentUserId = auth().currentUser?.uid;
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
    console.log(response.data());
  } catch (error) {
    console.log(error);
    console.log('If you see me, tell James');
    return false;
  }
};
