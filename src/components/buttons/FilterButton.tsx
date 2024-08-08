import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {size} from 'react-native-responsive-sizes';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🏷️
import type {FilterButtonProps} from './types';
import {useAppSelector} from 'reduxCore/hooks';

const FilterButton = ({onPress}: FilterButtonProps) => {
  const filterActivated = useAppSelector(
    state => state.adverts.filterActivated,
  );

  const activatedStyle = filterActivated
    ? Color.Lavendar[100]
    : Color.Black[50];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonOutline, {borderColor: activatedStyle}]}>
        <LofftIcon
          name="filter-funnel"
          size={size(25)}
          color={activatedStyle}
        />
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
