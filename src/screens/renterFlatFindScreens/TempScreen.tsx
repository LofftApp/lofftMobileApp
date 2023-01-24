import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';
import HighlightedButtons from '@Components/containers/HighlithgtedButtons';

const TempScreen = ({navigation}) => {
  return (
    <View style={styles.pageContainer}>
      <HighlightedButtons navigation={navigation} />
      <View style={styles.sampleImage}></View>

    </View>

  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  actionContainer: {
    marginVertical: 30,
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  sampleImage: {
    backgroundColor: 'blue',
    height: 200,
    width: '100%',

  }
})

export default TempScreen;
