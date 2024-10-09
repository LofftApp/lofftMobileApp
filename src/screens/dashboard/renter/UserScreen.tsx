import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Redux
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

//Components
import {CoreButton} from 'components/buttons/CoreButton';

//Styles
import {fontStyles} from 'styleSheets/fontStyles';
import {useSignOutMutation} from 'reduxFeatures/authentication/authApi';

const UserScreen = () => {
  const {data} = useGetUserQuery();
  const [signOut] = useSignOutMutation();

  const userCredits = data?.user?.credits;

  const handleSignOut = () => {
    signOut();
  };
  return (
    <View style={styles.userScreenContainer}>
      <Text>Hi from User Screen 👋</Text>
      <Text style={fontStyles.headerLarge}>Current Credits: {userCredits}</Text>
      <CoreButton
        value="Sign Out"
        style={styles.coreButtonStyle}
        onPress={handleSignOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coreButtonStyle: {
    width: '40%',
    marginTop: 20,
  },
});

export default UserScreen;
