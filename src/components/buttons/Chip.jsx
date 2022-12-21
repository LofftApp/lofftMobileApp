import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Color from '../../styles/lofftColorPallet.json';

const Chip = ({description}) => {
  const flatProperties = [
    'Close to U- & S-Bahn',
    '2 bathrooms',
    'Fully furnished',
    'Balcony',
    'toilet',
  ];
  const flatPersonalities = [
    'Chill & relax',
    'Climate crisis',
    'Chatty',
    'Party',
  ];
  return (
    <View style={styles.chipContainer}>
      {flatProperties.slice(0, 2).map((property, index) => {
        return (
          <View style={styles.chip}>
            <Text style={styles.chipFont}>{property}</Text>
          </View>
        );
      })}
      {flatProperties.length > 2 ? (
        <View style={styles.chip}>
          <Text style={styles.chipFont}>
            +{flatProperties.slice(1, -1).length}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

// 1. list all the properties user selected.
// 2. If the list has more than 2 properties, 3rd chip doesn't display the value.
// 3. 3rd chip dis play "+{the number of the rest}"

const styles = StyleSheet.create({
  chipContainer: {
    // flex: 1,
    flexDirection: 'row',
    rowGap: 10,
    columnGap: 10,
  },
  chip: {
    height: 'auto',
    width: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    backgroundColor: Color.Blue[10],
    borderRadius: 8,
    marginRight: 4,
  },
  chipFont: {
    fontSize: 14,
    color: Color.Blue[100],
  },
});

export default Chip;
