import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {CoreButton} from '@Components/buttons/CoreButton';

const UserScreen = () => {
  return (
    <View style={styles.userScreenContainer}>
      <Text>Hi from User Scren 👋</Text>
      <CoreButton
        value="Sign Out"
        style={{width: '40%', marginTop: 20}}
        onPress={() => {}}
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
