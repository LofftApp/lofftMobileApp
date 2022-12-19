import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Color from '../../styles/lofftColorPallet.json';

const Chip = ({description}) => {
  return (
    <View style={styles.chipContainer}>
      <Text style={styles.chipFont}>hihdfadfadsfi{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    // flex: 1,
    height: 'auto',
    width: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    backgroundColor: Color.Blue[10],
    borderRadius: 8,
  },
  chipFont: {
    fontSize: 14,
    color: Color.Blue[100],
  },
});

export default Chip;
