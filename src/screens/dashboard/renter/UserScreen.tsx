import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {CoreButton} from 'components/buttons/CoreButton';

// Redux
import {useAppDispatch} from 'reduxCore/hooks';
import {signOut} from 'reduxFeatures/authentication/authenticationMiddleware';
import {clearProfile} from 'reduxFeatures/user/usersSlice';

const UserScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.userScreenContainer}>
      <Text>Hi from User Scren 👋</Text>
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
