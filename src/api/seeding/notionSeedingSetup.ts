// ! This is a page for seeding data to the database, and has no basis in production, only development.
import {Client} from '@notionhq/client';
import {NOTION_API_KEY} from '@env';

// Data 💿
import userPreferences from '@Components/componentData/userPreferences.json';
import cityDistricts from '@Components/componentData/cityDistricts.json';
import flatPreferencesData from '@Components/componentData/flatPreferences.json';

const notion = new Client({auth: NOTION_API_KEY});

// Get Users from notion
export const getUsersFromNotion = async () => {
  const databaseId = '5bf250783d5d438f940512caf3293762';
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const users = response.results.map((user: any) => {
    const properties = user.properties;
    const name = properties.Name.title[0].plain_text;
    const email = properties?.Email?.email;
    const profileCreated = properties['User Profile created'].checkbox;
    const userType = properties['User Type']?.select?.name;
    const notionId = user?.id;
    let userProfileDetails = null;
    let flatId = null;
    if (profileCreated && userType === 'Renter') {
      userProfileDetails = renterUserType(properties);
    } else if (profileCreated && userType === 'Lessor') {
      flatId = properties.Flats.relation[0].id;
    }
    const coreValues = {
      notionId,
      name,
      email,
      profileCreated,
      userType,
      flatId,
    };
    return Object.assign({}, coreValues, userProfileDetails);
  });
  return users;
};

export const syncUser = async (user: any) => {
  const userExists = await seedCheckUserExists(user.notionId);
  if (userExists) return true;
  const userId = await seedSignupFlow(user.email);
  user.userId = userId;

  if (user.profileCreated && user.userType === 'Renter' && userId) {
    createUserProfile(user);
  } else if (user.profileCreated && user.userType === 'Lessor' && userId) {
    const flatDetails: any = await lessorUserType(user.flatId);
    flatDetails.userId = userId;
    flatDetails.notionId = user.notionId;
    createFlatProfile(flatDetails);
  }
};

const renterUserType = (properties: any) => {
  const genderIdentity = properties['Gender Identity'].select.name;
  const minRent = properties['Min Rent']?.number;
  const maxRent = properties['Max Rent']?.number;
  const warmRent = properties['Warm Rent'].checkbox;
  const personalPreferences = selectData(
    properties['Personal Preferences']['multi_select'],
    userPreferences,
  );
  const districts = selectData(
    properties.Districts['multi_select'],
    cityDistricts.berlin.districts,
  );
  const flatPreferences = selectData(
    properties['Flat Preferences']['multi_select'],
    flatPreferencesData,
  );
  return {
    genderIdentity,
    minRent,
    maxRent,
    warmRent,
    personalPreferences,
    districts,
    flatPreferences,
  };
};

const lessorUserType = async (id: string) => {
  const response: any = await notion.pages.retrieve({
    page_id: id,
  });
  const properties = response['properties'];
  const cost = properties?.Cost?.number;
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
  const description = properties?.About?.rich_text[0]?.text?.content;
  return {
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
};

// Notion seed Signup
const seedSignupFlow = async (email: string) => {
  const signUp: any = await handleSignUp({email, password: '123456'});
  if (signUp.error) {
    await handleSignIn({email, password: '123456'});
  }
  const uid: any = auth()?.currentUser?.uid;
  await auth().signOut();
  await handleSignIn({email: 'admin@example.com', password: '123456'});
  return uid;
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
