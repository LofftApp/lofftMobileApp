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

import auth from '@react-native-firebase/auth';

import Color from '@StyleSheets/lofftColorPallet.json';

// Components
import HighlightedButtons from '@Components/containers/HighlightButtons';
import PaginationBar from '@Components/bars/PaginationBar';
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';
import {CoreButton} from '@Components/buttons/CoreButton';

const TempScreen = ({navigation}: any) => {
  return (
    <View style={styles.pageContainer}>
      <View style={{marginTop: 400}}>
        <CoreButton value="Sign Out" onPress={() => auth().signOut()} />
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
