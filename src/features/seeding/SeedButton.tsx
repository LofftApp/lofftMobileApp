// ? Is this being used, please double check and if remove
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import Colors from '@StyleSheets/lofftColorPallet.json';

export const SeedButton = ({navigation}: any) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SeedingScreen')}
      style={[styles.logInWithButton, styles.syncButton]}>
      <LofftIcon name="refresh-ccq-03" size={30} color={Colors.Tomato['100']} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logInWithButton: {
    width: 64,
    height: 48,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Colors.Lavendar[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  syncButton: {
    borderColor: Colors.Tomato[100],
  },
});
