// ! This is a page for seeding data to the database, and has no basis in production, only development.
import {Client} from '@notionhq/client';
import {NOTION_API_KEY} from '@env';
import auth from '@react-native-firebase/auth';
import {handleSignUp} from '@Api/firebase/firebaseAuth';
import {
  createUserProfile,
  createFlatProfile,
} from '@Api/firebase/firestoreActions';

// Data 💿
import userPreferences from '@Components/componentData/userPreferences.json';
import cityDistricts from '@Components/componentData/cityDistricts.json';
import flatPreferencesData from '@Components/componentData/flatPreferences.json';

const notion = new Client({auth: NOTION_API_KEY});

export const startSeeding = async () => {
  const databaseId = '5bf250783d5d438f940512caf3293762';
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  let i = 0;
  const interval = setInterval(async () => {
    await seedUsers({response, i});
    i = i + 1;
    if (response.results.length === i) clearInterval(interval);
  }, 5000);
};

const seedUsers = async ({response, i}: any) => {
  const properties = response.results[i].properties;
  const email = properties.Email.email;
  console.log('Creating user: ', email);
  await handleSignUp({email, password: '123456'})
    // .then(async (response: any) => {
    //   console.log('User Profile Created for: ', auth().currentUser?.email);
    //   const profileCreated = properties['User Profile created'].checkbox;
    //   console.log('This user has a profile: ', profileCreated === true);
    //   if (profileCreated) {
    //     const userType = properties['User Type'].select.name;
    //     console.log(`This user is a ${userType}`);
    //     if (userType === 'Renter') {
    //       const genderIdentity = properties['Gender Identity'].select.name;
    //       const minRent = properties['Min Rent'].number;
    //       const maxRent = properties['Max Rent'].number;
    //       const warmRent = properties['Warm Rent'].checkbox;
    //       const personalPreferences = selectData(
    //         properties['Personal Preferences']['multi_select'],
    //         userPreferences,
    //       );
    //       const districts = selectData(
    //         properties.Districts['multi_select'],
    //         cityDistricts.berlin.districts,
    //       );
    //       const flatPreferences = selectData(
    //         properties['Flat Preferences']['multi_select'],
    //         flatPreferencesData,
    //       );
    //       console.log('Creating user profile: ', auth().currentUser?.email);
    //       await createUserProfile({
    //         userId: response.user?.uid,
    //         genderIdentity,
    //         userDescription: '',
    //         personalPreferences,
    //         flatPreferences,
    //         districts,
    //         minRent,
    //         maxRent,
    //         warmRent,
    //       });
    //     }
    //     // else if (userType === 'Lessor') {
    //     //   await createUserProfile({userId: response.user?.uid});
    //     //   if (properties.Flats.relation) {
    //     //     await seedFlat(properties.Flats.relation[0].id);
    //     //   }
    //     // }
    //   }
    // })
    .then(() => {
      console.log('Signing Out: ', auth().currentUser?.email);
      auth().signOut();
    });
};

const seedFlat = async (id: any) => {
  console.log('Seed Flats');

  const response: any = await notion.pages.retrieve({
    page_id: id,
  });
  const properties = response['properties'];
  const cost = properties.Cost.number;
  const flatFeatures = selectData(
    properties['Flat Features']['multi_select'],
    flatPreferencesData,
  );
  const flatMate = selectData(
    properties['Flat Mate']['multi_select'],
    userPreferences,
  );
  const fromDate = new Date(2023, mathRandom(3, 12), mathRandom(1, 28));
  const location = properties.Address.rich_text[0].text.content;
  const district = properties?.District?.select?.name;
  const perminant = properties.Perminant.checkbox;
  const untilDate = perminant
    ? null
    : new Date(mathRandom(2024, 2026), mathRandom(1, 12), mathRandom(1, 28));
  const warmRent = properties['Warm Rent'].checkbox;
  const images = properties?.Photos?.files.map((image: any) => {
    return image?.external?.url;
  });
  const description = properties?.About?.rich_text?.text?.content;
  const data = {
    cost,
    flatFeatures,
    flatMate,
    fromDate,
    location,
    district,
    untilDate,
    warmRent,
    images,
    description,
  };
  await createFlatProfile(data);
};

// Used to select data from json using the seed preferences
const selectData = (userData: any, baseData: any) => {
  return userData.map((item: {name: string}) => {
    let selectItem: Object = '';
    baseData.forEach((element: any) => {
      if (item.name === (element.value || element.name)) {
        element.toggle = true;
        selectItem = element;
      }
    });
    return selectItem;
  });
};

const mathRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
