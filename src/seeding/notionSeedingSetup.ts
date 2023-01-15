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
        const personalPreferences = personalPreferencesSelectData(
          properties['Personal Preferences']['multi_select'],
        );
        const districts = districtsSelectData(
          properties.Districts['multi_select'],
        );
        const flatPreferences = flatPreferencesSelectData(
          properties['Flat Preferences']['multi_select'],
        );
        console.log(flatPreferences);
      }
    }
  });
};

const personalPreferencesSelectData = (data: any) => {
  return data.map((item: {name: string}) => {
    let selectItem: Object = '';
    userPreferences.forEach((element: any) => {
      if (item.name === element.value) {
        element.toggle = true;
        selectItem = element;
      }
    });
    return selectItem;
  });
};

const districtsSelectData = (data: any) => {
  const berlin: any = cityDistricts.berlin.districts;
  return data.map((item: {name: string}) => {
    let selectItem: Object = '';
    if (data.length > 0) {
      berlin.forEach((element: any) => {
        if (item.name === element.name) {
          element.toggle = true;
          selectItem = element;
        }
      });
    }
    return selectItem;
  });
};

const flatPreferencesSelectData = (data: any) => {
  return data.map((item: {name: string}) => {
    let selectItem: Object = '';
    flatPreferences.forEach((element: any) => {
      if (item.name === element.value) {
        element.toggle = true;
        selectItem = element;
      }
    });
    return selectItem;
  });
};
