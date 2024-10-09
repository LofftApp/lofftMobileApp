import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Redux
import {useAppDispatch} from 'reduxCore/hooks';
import {signOut} from 'reduxFeatures/authentication/authenticationMiddleware';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

//Components
import {CoreButton} from 'components/buttons/CoreButton';

//Styles
import {fontStyles} from 'styleSheets/fontStyles';

const UserScreen = () => {
  const dispatch = useAppDispatch();

  const {data} = useGetUserQuery();
  const userCredits = data?.user?.credits;

  const handleSignOut = () => {
    dispatch(signOut());
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
