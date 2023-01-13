// ! This is a page for seeding data to the database, and has no basis in production only development.
import {Client} from '@notionhq/client';
import {NOTION_API_KEY} from '@env';
import {handleSignUp} from '@Firebase/firebaseAuth';

const notion = new Client({auth: NOTION_API_KEY});

export const seedUsers = async () => {
  const databaseId = '5bf250783d5d438f940512caf3293762';
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  response.results.forEach((user: any) => {
    const email = user.properties.Email.email;
    handleSignUp({email, password: '123456'});
  });
};
