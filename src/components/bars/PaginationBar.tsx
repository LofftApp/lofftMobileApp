import React from 'react';
import {View, StyleSheet} from 'react-native';

// Assets 🖼
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🏷
import type {PaginationBarProps} from './types';
import {size} from 'react-native-responsive-sizes';

const buildNumberArray = (length: number) => {
  let i = 1;
  const response: Number[] = [];
  while (i < length + 1) {
    response.push(i);
    i++;
  }
  return response;
};

const PaginationBar = ({
  screen,
  totalScreens,
  onTop = false,
  marginVertical,
}: PaginationBarProps) => {
  const blobs = buildNumberArray(totalScreens);
  return (
    <View
      style={[
        styles.pagination,
        onTop ? styles.positionTop : styles.positionBottom,
        {
          marginVertical: marginVertical,
        },
      ]}>
      {blobs.map((i, index) => {
        const active = index === screen && {
          width: 18,
          backgroundColor: Color.Lavendar[50],
        };

        return <View style={[styles.paginationBlob, active]} key={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: size(5),
  },
  paginationBlob: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Color.Black[10],
    marginHorizontal: 3,
  },

  positionTop: {
    position: 'absolute',
  },
  positionBottom: {
    position: 'relative',
  },
});

export default PaginationBar;
