import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Color from '../../styles/lofftColorPallet.json';

const Chips = ({flatData}: any) => {
  // flat data example
  const flatInfo = {
    flatProperties: [
      'Close to U- & S-Bahn',
      '2 bathrooms',
      'Fully furnished',
      'Balcony',
      'toilet',
    ],
    flatPersonalities: [
      'Chill & relax',
      'Climate crisis',
      'Chatty',
      'Party',
      'Happy',
      'sad',
    ],
  };
  return (
    <View style={styles.chipContainer}>
      <ListChips
        style={[styles.propertyChip, styles.propertyChipFont]}
        list={flatInfo.flatProperties}
      />
      <ListChips
        style={[styles.personalityChip, styles.personalityChipFont]}
        list={flatInfo.flatPersonalities}
      />
    </View>
  );
};

const ListChips = ({list, style}: any) => {
  return (
    <View style={styles.chipsWrap}>
      {list.slice(0, 2).map((item: any, index: number) => {
        return (
          <View style={style[0]} key={index}>
            <Text style={style[1]}>{item}</Text>
          </View>
        );
      })}
      {list.length > 2 ? (
        <View style={style[0]}>
          <Text style={style[1]}>+{list.slice(1, -1).length}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'column',
  },
  chipsWrap: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  propertyChip: {
    height: 'auto',
    width: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginRight: 4,
    backgroundColor: Color.Blue[10],
  },
  personalityChip: {
    height: 'auto',
    width: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginRight: 4,
    backgroundColor: Color.Lavendar[10],
  },
  propertyChipFont: {
    fontSize: 14,
    color: Color.Blue[100],
  },
  personalityChipFont: {
    fontSize: 14,
    color: Color.Lavendar[100],
  },
});

export default Chips;
