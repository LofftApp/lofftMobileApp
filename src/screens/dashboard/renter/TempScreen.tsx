import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';

import Color from 'styleSheets/lofftColorPallet.json';
// Redux
import {useAppDispatch} from 'reduxCore/hooks';
import {signOut} from 'reduxFeatures/authentication/authenticationMiddleware';

// Components
import {CoreButton} from 'components/buttons/CoreButton';

const TempScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <View style={styles.pageContainer}>
      <View style={{marginTop: 400}}>
        <Text>Temp Screen</Text>
        <CoreButton value="Sign Out" onPress={handleSignOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  imageContainer: {
    height: 300,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default TempScreen;
