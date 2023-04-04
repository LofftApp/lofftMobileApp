import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

// Redux 🧠
import {useDispatch} from 'react-redux';
import {signOut} from '@Redux/authentication/authenticationMiddleware';

import Color from '@StyleSheets/lofftColorPallet.json';

// Components
import {CoreButton} from '@Components/buttons/CoreButton';

const TempScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.pageContainer}>
      <View style={{marginTop: 400}}>
        <CoreButton value="Sign Out" onPress={() => dispatch(signOut())} />
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
