import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {CoreButton} from 'components/buttons/CoreButton';

// Redux
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {signOut} from 'reduxFeatures/authentication/authenticationMiddleware';
import {clearProfile} from 'reduxFeatures/user/usersSlice';
import {fontStyles} from 'styleSheets/fontStyles';

const UserScreen = () => {
  const dispatch = useAppDispatch();

  const userCredits = useAppSelector(state => state.user.user.credits);

  return (
    <View style={styles.userScreenContainer}>
      <Text>Hi from User Screen 👋</Text>
      <Text style={fontStyles.headerLarge}>Current Credits: {userCredits}</Text>
      <CoreButton
        value="Sign Out"
        style={styles.coreButtonStyle}
        onPress={() => {
          dispatch(signOut());
          dispatch(clearProfile());
        }}
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
