import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {CoreButton} from '@Components/buttons/CoreButton';

// Redux
import {useAppDispatch} from '@ReduxCore/hooks';
import {signOut} from '@Redux/authentication/authenticationMiddleware';

const UserScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.userScreenContainer}>
      <Text>Hi from User Scren 👋</Text>
      <CoreButton
        value="Sign Out"
        style={{width: '40%', marginTop: 20}}
        onPress={() => dispatch(signOut())}
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
});

export default UserScreen;
