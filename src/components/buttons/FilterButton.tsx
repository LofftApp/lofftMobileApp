import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {size} from 'react-native-responsive-sizes';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🏷️
import type {FilterButtonProps} from './types';

const FilterButton = ({onPress, isSearching}: FilterButtonProps) => {
  const iconColor = isSearching ? Color.White[100] : Color.Black[50];
  const bgColor = isSearching ? Color.Lavendar[100] : Color.White[100];
  const borderColor = isSearching ? Color.Lavendar[100] : Color.Black[50];
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.buttonOutline,
          {borderColor: borderColor},
          {backgroundColor: bgColor},
        ]}>
        <LofftIcon name="filter-funnel" size={size(25)} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: size(2),
    width: size(56),
    height: size(48),
    borderRadius: 12,
    marginLeft: size(4),
  },
});

export default FilterButton;
