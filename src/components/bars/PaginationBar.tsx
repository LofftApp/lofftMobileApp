import React from 'react';
import {View, StyleSheet} from 'react-native';

// Assets 🖼
import Color from '@StyleSheets/lofftColorPallet.json';

const buildNumberArray = (length: any) => {
  let i = 1;
  const response: Number[] = [];
  while (i < length + 1) {
    response.push(i);
    i++;
  }
  return response;
};

const PaginationBar = ({screen, totalScreens, onTop = false, marginVertical}: any) => {
  const blobs = buildNumberArray(totalScreens);
  return (
    <View style={[styles.pagination, { position: onTop ? 'absolute' : 'relative', marginVertical: marginVertical }]}>
      {blobs.map((i, index) => {
        const active =
          index === screen
            ? {width: 18, backgroundColor: Color.Lavendar[50]}
            : null;
        return <View style={[styles.paginationBlob, active]} key={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  paginationBlob: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Color.Black[10],
    marginHorizontal: 3,
  },
  active: {},
});

export default PaginationBar;
