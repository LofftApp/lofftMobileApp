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

// Get flats (Currently all flats)
export const getFlatsFromDB = async () => {
  const currentUserProfile = await firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .get();

  const currentUserData = currentUserProfile.data();
  const userPreferences = currentUserData?.profileDetails.personalPreferences;
  try {
    const response = await firestore().collection('flats').get();
    const flats: any = response.docs.map((flat: any) => {
      const data = flat.data();
      return {
        address: data.location,
        price: data.cost,
        matchP: calculateMatchScore({
          userPreferences,
          flatPreferences: data.flatMate,
        }),
      };
    });
    return flats;
  } catch (error) {
    console.log(error);
  }
};

const calculateMatchScore = ({userPreferences, flatPreferences}: any) => {
  let points: number = 100;
  const userValues = getValues(userPreferences);
  const flatValues = getValues(flatPreferences);
  flatValues.forEach((item: any, i: number) => {
    const userIndexItem = userValues.indexOf(item);
    // console.log(`The user Index is: ${userIndexItem}`);
    let diff = 10;
    if (userIndexItem >= 0) {
      diff = i - userIndexItem;
      if (diff < 0) diff *= -1;
    }
    points -= diff;
  });
  return points;
};

const getValues = (data: any) => {
  const items = data.map((e: any) => {
    return e.value;
  });
  return items;
};
