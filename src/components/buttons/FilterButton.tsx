import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {size} from 'react-native-responsive-sizes';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🏷️
import type {FilterButtonProps} from './types';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxCore/store';


const FilterButton = ({onPress, isSearching}: FilterButtonProps) => {

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;

  const iconColor = isSearching ? colors.White[100] : colors.Black[50];
  const bgColor = isSearching ? colors.Lavendar[100] : colors.White[100];
  const borderColor = isSearching ? colors.Lavendar[100] : colors.Black[50];
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
