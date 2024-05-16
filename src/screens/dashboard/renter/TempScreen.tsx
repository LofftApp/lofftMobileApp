import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import Color from 'styleSheets/lofftColorPallet.json';
// Redux
import {useAppDispatch} from 'reduxCore/hooks';
import {signOut} from 'reduxFeatures/authentication/authenticationMiddleware';
import {clearProfile} from 'reduxFeatures/user/usersSlice';

// Components
import {CoreButton} from 'components/buttons/CoreButton';

const TempScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.pageContainer}>
      <View style={{marginTop: 400}}>
        <CoreButton
          value="Sign Out"
          onPress={() => {
            dispatch(signOut());
            dispatch(clearProfile());
          }}
        />
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
