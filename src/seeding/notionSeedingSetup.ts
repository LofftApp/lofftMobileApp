// ! This is a page for seeding data to the database, and has no basis in production, only development.
import {Client} from '@notionhq/client';
import {NOTION_API_KEY} from '@env';
import auth from '@react-native-firebase/auth';
import {handleSignUp} from '@Firebase/firebaseAuth';
import {createUserProfile} from '@Firebase/firestoreActions';

// Data 💿
import userPreferences from '@Components/componentData/userPreferences.json';
import cityDistricts from '@Components/componentData/cityDistricts.json';
import flatPreferences from '@Components/componentData/flatPreferences.json';

const notion = new Client({auth: NOTION_API_KEY});

export const seedUsers = async () => {
  const databaseId = '5bf250783d5d438f940512caf3293762';
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  response.results.forEach((user: any) => {
    const properties = user.properties;
    const email = properties.Email.email;
    const profileCreated = properties['User Profile created'].checkbox;
    // handleSignUp({email, password: '123456', seed: true});
    if (profileCreated) {
      const userType = properties['User Type'].select.name;
      if (userType === 'Renter') {
        const genderIdentity = properties['Gender Identity'].select.name;
        const personalPreferences = selectData(
          properties['Personal Preferences']['multi_select'],
          userPreferences,
        );
        const districts = selectData(
          properties.Districts['multi_select'],
          cityDistricts.berlin.districts,
        );
        const flatFeaturePreferences = selectData(
          properties['Flat Preferences']['multi_select'],
          flatPreferences,
        );
      }
    }
  });
};

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
