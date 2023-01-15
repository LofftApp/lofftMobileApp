// ! This is a page for seeding data to the database, and has no basis in production, only development.
import {Client} from '@notionhq/client';
import {NOTION_API_KEY} from '@env';
import auth from '@react-native-firebase/auth';
import {handleSignUp} from '@Firebase/firebaseAuth';
import {createUserProfile} from '@Firebase/firestoreActions';

// Data 💿
import userPreferences from '@Components/componentData/userPreferences.json';
import cityDistricts from '@Components/componentData/cityDistricts.json';
import flatPreferencesData from '@Components/componentData/flatPreferences.json';

const notion = new Client({auth: NOTION_API_KEY});

export const seedUsers = async () => {
  const databaseId = '5bf250783d5d438f940512caf3293762';
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  let i = 0;
  const interval = setInterval(async () => {
    const properties = response.results[i].properties;
    console.log(`Syncing ${properties.Name.title[0].plain_text}`);
    const email = properties.Email.email;

    await handleSignUp({email, password: '123456'}).then(
      async (response: any) => {
        const profileCreated = properties['User Profile created'].checkbox;
        if (profileCreated) {
          const userType = properties['User Type'].select.name;
          if (userType === 'Renter') {
            const genderIdentity = properties['Gender Identity'].select.name;
            const minRent = properties['Min Rent'].number;
            const maxRent = properties['Max Rent'].number;
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
            await createUserProfile({
              userId: response.user?.uid,
              genderIdentity,
              userDescription: '',
              personalPreferences,
              flatPreferences,
              districts,
              minRent,
              maxRent,
              warmRent,
            });
          } else if (userType === 'Lessor') {
            await createUserProfile({userId: response.user?.uid});
          }
        }
      },
    );

    await auth().signOut();
    i = i + 1;
    if (response.results.length === i) clearInterval(interval);
  }, 3000);
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
