import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

// Api

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Redux 🧠
import UserJourneyButton from 'reduxFeatures/registration/UserJourneyButton';

// StyleSheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';

const AdminScreen = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const assignUsers = async () => {
      const users: any = await getUsersFromNotion();
      setUsers(users);
    };
    assignUsers();
  }, []);
  return (
    <ScreenBackButton nav={() => {}} title={'Admin Screen'}>
      <Text style={fontStyles.bodySmall}>
        This is the admin screen, use this to seed and update details in the
        applicaiton.
      </Text>
      <View style={styles.container}>
        <Text style={fontStyles.headerMedium}>User Overview</Text>
        {users.map((user: any) => (
          <View key={user.name}>
            <View style={styles.header}>
              <Text style={fontStyles.headerSmall}>{user.name}</Text>
              <View style={styles.buttonContainer}>
                <Text style={fontStyles.headerSmall}>
                  {user.userType ? user.userType : 'New User'}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AdminScreen;
