import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import { width, height, size, fontSize } from "react-native-responsive-sizes";

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

const FilterButton = ({onPress}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonOutline}>
        <LofftIcon name="filter-funnel" size={size(25)} color={Color.Black[50]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: size(2),
    borderColor: Color.Black[50],
    width: size(56),
    height: size(48),
    borderRadius: 12,
    marginLeft: size(4),
  },
});

export default FilterButton;
