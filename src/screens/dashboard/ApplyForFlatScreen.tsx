import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';
import { fontStyles } from '@StyleSheets/fontStyles';

const ApplyForFlatScreen = () => {
  return (
    <View style={styles.pageContainer}>
      <Text style={[fontStyles.headerSmall,styles.hack ]}>You’ve applied for this Lofft. {'\n'} The owner has maximum 48 hours to get back to you!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%'
  },
  hack: {
    textAlign: 'center'
  }


})

export default ApplyForFlatScreen;
