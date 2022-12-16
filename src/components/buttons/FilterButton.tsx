import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// StyleSheet
import Color from '@StyleSheets/lofftColorPallet.json';

const FilterButton = ({onPress}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonOutline}>
        <Icon name="filter-outline" size={25} color={Color.Black[50]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Color.Black[50],
    width: 48,
    height: 48,
    borderRadius: 12,
    marginHorizontal: 4,
  },
});

export default FilterButton;
