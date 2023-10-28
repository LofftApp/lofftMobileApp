import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import { fontStyles } from '@StyleSheets/fontStyles';

// Components
import { CoreButton } from '@Components/buttons/CoreButton';


const SeeProfilesScreen = () => {
  return (
    <View style={styles.pageWrapper}>
      <Text style={[styles.header, fontStyles.headerSmall]}>Applicants</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    marginTop: 70,
    width: '100%',
    textAlign: 'center'
  },
  headerText: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default SeeProfilesScreen;
