import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {dateFormatConverter} from '@Helpers/dateFormatConverter';
// Save user profile

export const createUserProfile = async (data: any) => {
  const userData = {
    notionId: data.notionId || null,
    profileDetails: {
      genderIdentity: data?.genderIdentity || '',
      userDescription: data.userDescription || '',
      personalPreferences: data.personalPreferences || {},
    },
    searchCriteria: {
      districts: data?.districts || {},
      flatPreferences: data?.flatPreferences || {},
      maxRent: data?.maxRent || 10000,
      minRent: data?.minRent || 0,
      warmRent: data?.warmRent || false,
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
  const flatId = response.id;
  await firestore()
    .collection('users')
    .doc(currentUserId)
    .set({flats: [flatId], notionId: data.notionId});
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
  const userPreferences = currentUserData?.profileDetails?.personalPreferences;
  try {
    const response = await firestore().collection('flats').get();
    const flats: any = response.docs.map((flat: any) => {
      const data = flat.data();
      return {
        flatId: flat.id,
        address: data.location,
        district: data.district,
        price: data.cost,
        matchP: calculateMatchScore({
          userPreferences,
          flatPreferences: data.flatMate,
        }),
        images: data.images,
        likedUsers: data?.likedUsers,
        description: data?.description,
        flatFeatures: data?.flatFeatures,
        flatMate: data?.flatMate,
        fromDate: dateFormatConverter({date: data?.fromDate}),
        untilDate: dateFormatConverter({date: data?.untilDate}),
        warmRent: data?.warmRent,
      };
    });
    return flats;
  } catch (error) {
    console.log(error);
  }
};

const calculateMatchScore = ({userPreferences, flatPreferences}: any) => {
  if (userPreferences) {
    let points: number = 100;
    const userValues = getValues(userPreferences);
    const flatValues = getValues(flatPreferences);
    flatValues.forEach((item: any, i: number) => {
      const userIndexItem = userValues.indexOf(item);
      let diff = 10;
      if (userIndexItem >= 0) {
        diff = i - userIndexItem;
        if (diff < 0) diff *= -1;
      }
      points -= diff;
    });
    return points;
  }
  return null;
};

const getValues = (data: any) => {
  const items = data.map((e: any) => {
    return e.value;
  });
  return items;
};

// * Seeding actions

// Check a user exists already
export const seedCheckUserExists = async (userId: string) => {
  try {
    const response = await firestore()
      .collection('users')
      .where('notionId', '==', userId)
      .get();
    return response.docs.length > 0;
  } catch (error) {
    console.log(error);
  }
};

// Save Flat to user list

export const saveFlatToUserLikes = async ({flatId, add}: any) => {
  console.log(flatId);
  try {
    const currentUser: any = await auth()?.currentUser?.uid;
    if (add) {
      await firestore()
        .collection('flats')
        .doc(flatId)
        .update({
          likedUsers: firestore.FieldValue.arrayRemove(currentUser),
        });

      await firestore()
        .collection('users')
        .doc(currentUser)
        .update({savedFlats: firestore.FieldValue.arrayRemove(flatId)});
    } else {
      await firestore()
        .collection('flats')
        .doc(flatId)
        .update({likedUsers: firestore.FieldValue.arrayUnion(currentUser)});

      await firestore()
        .collection('users')
        .doc(currentUser)
        .update({savedFlats: firestore.FieldValue.arrayUnion(flatId)});
    }
  } catch (error) {
    console.log(error);
  }
};
